Concepts:
- A simple login system with protected routes
- HTML + Nginx as Frontend,  Express + Redis as Backend
- Use bash script and docker-compose to host the app and initialize database

How to run the app:
- Download the repo
- Open .env.local file in the root directory
- Change environment variables
- Run command: chmod +x start-local.sh (To grant the permission of the script file)
- Run command: ./start-local.sh
- If you want to check the redis connection or the database initialization is successful, run the commands below after running 
    - docker-compose exec nodejs node test-checkRedis.js
    - docker-compose exec nodejs node test-checkDB.js
- Go to http://localhost:2370/login.html
- Credentials: theuser / abc123


