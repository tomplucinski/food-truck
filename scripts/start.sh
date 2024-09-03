#!/bin/bash

COMPOSE_VERSION=$(docker-compose --version)
DOCKER_VERSION=$(docker --version)

echo "> running docker compose up. $DOCKER_VERSION. $COMPOSE_VERSION. "

docker-compose -f docker-compose.yml --env-file .env.local up -d

if [ "$?" == "1" ]; then
  echo "Failed to start docker images."
  exit 1
fi

sleep 1

echo "> starting project"
npm run dev
