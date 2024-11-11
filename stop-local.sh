#!/bin/bash

echo "Stopping conntainers, removing containers, networks, volumes, and images..."

docker-compose down -v --rmi all

echo "Clean up completed."