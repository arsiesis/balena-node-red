#!/bin/sh

REDIS_PASSWORD="${REDIS_PASSWORD:-redis}"

echo "requirepass \"$REDIS_PASSWORD\"" >> /usr/local/etc/redis/redis.conf

redis-server "/usr/local/etc/redis/redis.conf"
