#!/bin/bash

cp .env.local .env
# # Source the .env file to get the variables
set -a
source .env
set +a

docker-compose build
docker-compose up -d

echo "Waiting for services to start..."

MAX_ATTEMPTS=10
ATTEMPTS=0

# https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/

while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
    # List containers that are named nodejs, and if it has the state up, then do next movement
    if docker-compose ps nodejs | grep "Up"; then
        echo "Node.js container is up!"

        sleep 3 

        echo "Initializing database..."
        if docker-compose exec nodejs node src/config/initDB.js; then
            sleep 1
            echo "Database initialization completed successfully"
            sleep 1
            exit 0
        else 
            echo "Database initialization failed."
            exit 1
        fi
    fi

    echo "Waiting for Node.js container to be ready...(Attempt $((ATTEMPTS + 1))/$MAX_ATTEMPTS)"
    ATTEMPTS=$((ATTEMPTS + 1))

done

echo "Error: Node.js container failed to start properly after $MAX_ATTEPMTS attempts"
exit 1
