#!/bin/bash

# enable 1wire 
# modprobe w1-gpio && modprobe w1-therm

# Make the default flows available in the user library
mkdir -p /data/node-red/user/lib/flows || true
cp /usr/src/app/flows/* /data/node-red/user/lib/flows/

# Make the default functions available in the user library
mkdir -p /data/node-red/user/lib/functions || true
cp /usr/src/app/functions/* /data/node-red/user/lib/functions/

if [ ! -d /data/node-red/nodes ]; then
    echo "Pas encore de noeud perso..."
else
    echo "Suppression des anciens noeuds"
    rm -rf /data/node-red/nodes
fi

# Make personal node available  >>> bug rend les noeuds persistant en cas de mise à jours il ne sont pas update
mkdir -p /data/node-red/nodes || true
cp -r /usr/src/app/nodes/* /data/node-red/nodes/

# only copy the flow balena_flows.json if it doesn't exist as we don't want to overwrite any
# changes made via the node-red editor.
if [ ! -f /data/node-red/user/flows.json ]; then
    echo "Copying flows.json from repository to folder /data/node-red/user"
    cp /usr/src/app/flows/flows_new.json /data/node-red/user/flows.json
else
    echo "NOT copying flows.json from repository to folder /data/node-red/user as this flow already exists in that folder !!"
fi

# Start app
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket node-red --settings /usr/src/app/settings.js