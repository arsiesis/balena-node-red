FROM alpine:latest

ENV LANG C.UTF-8
RUN set -xe \
    && apk update \
    && apk add --no-cache --virtual .build-dependencies \
                git \
     && apk add --no-cache \
                abuild \
                binutils \
                build-base \
                automake \
                autoconf \
                argp-standalone \
                linux-headers \
                libev-dev \
                libusb-dev \
                cmake \
                dev86 \     
                gcc \
                udev \
                bash \                
                libusb \
                libev \
                libtool \                
                jq
# ARG is in my Synology Docker version not working - yet
#ARG KNXD_VERSION
#RUN git clone --branch "$KNXD_VERSION" --depth 1 https://github.com/knxd/knxd.git \
RUN git clone --branch "0.14.39" --depth 1 https://github.com/knxd/knxd.git \
     && cd knxd \
     && ./bootstrap.sh \
     && ./configure --disable-systemd --enable-tpuart --enable-usb --enable-eibnetipserver --enable-eibnetip --enable-eibnetserver --enable-eibnetiptunnel \
     && mkdir -p src/include/sys && ln -s /usr/lib/bcc/include/sys/cdefs.h src/include/sys \
     && make \
     && make install \
     && make clean \
     && cd .. \
     && rm -rf knxd \
     && apk del --purge .build-dependencies

# copy knxd configuration
COPY knxd.ini /etc/

ENTRYPOINT ["knxd", "/etc/knxd.ini"]
