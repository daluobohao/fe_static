#!/bin/bash
set -x
set -e

mkdir release/libexec/jmxmonitor/lib/ -p

mvn -U dependency:copy-dependencies -DoutputDirectory=release/libexec/jmxmonitor/lib/dependency/
mvn -U org.apache.maven.plugins:maven-dependency-plugin:2.8:get -DgroupId=com.xiaomi.sre -DartifactId=jmxMonitor -Dversion=0.0.1-SNAPSHOT -Ddest=release/libexec/jmxmonitor/lib/
cp -r bin conf release/libexec/jmxmonitor/
mvn clean
