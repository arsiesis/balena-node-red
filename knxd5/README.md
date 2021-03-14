# knxd-docker

Build the container with specific version of KNXD.

```bash
docker build -t michelmu/knxd-docker --build-arg KNXD_VERSION=0.14.39 .
```

Run knxd in docker container

```bash
docker run \
--name=knxd \
-p 6720:6720/tcp -p 3671:3671/udp \
--device=/dev/bus/usb:/dev/bus/usb:rwm \
--device=/dev/mem:/dev/mem:rw \
--device=/dev/knx:/dev/knx \
--cap-add=SYS_MODULE --cap-add=SYS_RAWIO \
--restart unless-stopped michelmu/knxd
```

Test the knx server by login to the container and run e.g.
`knxtool groupswrite ip:localhost 0/0/20 0`
