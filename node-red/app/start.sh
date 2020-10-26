#!/bin/bash

# enable 1wire 
# modprobe w1-gpio && modprobe w1-therm

# Make the default flows available in the user library
mkdir -p /data/node-red/user/lib/flows || true
cp /usr/src/app/flows/* /data/node-red/user/lib/flows/

# Make the default functions available in the user library
mkdir -p /data/node-red/user/lib/functions || true
cp /usr/src/app/functions/* /data/node-red/user/lib/functions/

# Start app
DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket node-red --settings /usr/src/app/settings.js
