#!/bin/bash

cp .env.local .env
# # Source the .env file to get the variables
set -a
source .env
set +a

docker-compose --build
docker-compose up -d
