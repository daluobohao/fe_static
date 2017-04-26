#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import re
import sys
import time
import json
import socket
import commands
import argparse

def jmx_update(srv, host, port):

    java_home = os.environ.get("JAVA_HOME")
    if not java_home:
        print "ERROR: Please set JAVA_HOME"
        sys.exit(1)

    if os.path.exists("%s/jre/lib/management/jmxremote.password" % java_home):
        jmx_role = "monitorRole"
        cmd = "awk '{if($1==\"%s\") print $2}' %s/jre/lib/management/jmxremote.password" % (jmx_role, java_home)
        jmx_password = os.popen(cmd).read().strip('\n')
    else:
        jmx_role = ""
        jmx_password = ""

    hostname = socket.gethostname()

    jmx_counter = {}
    jmx_counter['data'] = {}
    jmx_counter['timestamp'] = int(time.time())

    endpoint = hostname + ":" + srv

    cmd = "%s/bin/java -classpath .:../lib/dependency/*:../lib/jmxMonitor-0.0.1-SNAPSHOT.jar com.xiaomi.sre.jmxmonitor.common.jmxCollClient %s %s %s %s" % (java_home, host, port, jmx_role, jmx_password)
    jvm_key = os.popen(cmd).read()

    if re.match('ERROR', jvm_key):
        print jvm_key.strip()
    else:
        json_info = json.load(file('../conf/collectConf.json'))
        jmx_info = {}
        for key in jvm_key.strip('\n').split('\n'):
            json_info[key.split(':')[0]][key.split(':')[1]]['value'] = key.split(':')[2]
            del json_info[key.split(':')[0]][key.split(':')[1]]['Name']
            del json_info[key.split(':')[0]][key.split(':')[1]]['Attribute']
            del json_info[key.split(':')[0]][key.split(':')[1]]['Methods']
            del json_info[key.split(':')[0]][key.split(':')[1]]['ClassName']
            del json_info[key.split(':')[0]][key.split(':')[1]]['Parameter']

        for key in json_info.keys():
            for item in json_info[key].keys():
                if "value" not in json_info[key][item].keys():
                    del json_info[key][item]
            if key in jvm_key:
                jmx_info[srv + "_jmx_" + key] = json_info[key]
        if json_info:
            jmx_counter['data'][endpoint] = jmx_info

        data_send = json.dumps(jmx_counter)
        #print(json.dumps(jmx_counter, indent=1))
        data_id = "jmx_" + hostname

        run_lock = "/dev/shm/jmxmonitor_" + hostname + ".lock"
        if os.path.exists(run_lock):
            print commands.getoutput('''curl -X POST http://10.0.4.65:8080/perf -d data='%s' -d dataid=%s''' % (data_send, data_id))
        else:
            print commands.getoutput('''curl -X POST http://10.0.4.65:8080/perf -d data='%s' -d dataid=%s -d build=true''' % (data_send, data_id))
            os.mknod(run_lock)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='collect the jvm status by querying the JMX of a specified jvm.')
    parser.add_argument('--host', default="localhost", help="which host the jvm is running on.")
    parser.add_argument('--port', help='the jmx port.')
    parser.add_argument("service_name", help="the service name")
    args = parser.parse_args()

    jmx_update(args.service_name, args.host, args.port)
