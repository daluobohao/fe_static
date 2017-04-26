#!/bin/sh

set -e
set -x

JOB_ENV=$1
CLUSTER=`python ./deploy/find_cluster.py ${JOB_ENV}`
echo $CLUSTER

SCRIPT_DIR=`cd $(dirname $0); pwd -P`
cd $SCRIPT_DIR

#install resin to $SCRIPT_DIR
#export SCRIPT_DIR
#python ./deploy/installer.py ./deploy/resin-installer.yaml

#mvn -U clean package -D${CLUSTER}=true -Dboss-online=true

mkdir -p release/base/telecom-fe-feichanzhun
cp -r dist/* release/base/telecom-fe-feichanzhun
cp -r deploy/ release/
#cp -r libexec/ release/
#cp -r fe-build.sh release/
#cp -r pre-fe-build.sh release/
#cp -r readme release/
#cp -r src release/

#mvn clean

#build jmxmonitor
pushd jmxmonitor
sh build.sh
popd

#cp -r jmxmonitor/release/libexec release/

