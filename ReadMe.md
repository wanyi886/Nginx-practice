Concepts:
- A simple login system with protected routes 
- HTML + Nginx as Frontend,  Express as Backend, Redis as database
- Implement authentication with authorization header and bearer token
- Use bash script and docker-compose to host the app and initialize database

How to run the app:
- Download the repository
- Open .env.local file in the root directory 
- Change environment variables
- Run command: chmod +x start-local.sh (To grant the permission of the script file)
- Run command: ./start-local.sh
- If you want to check the redis connection or the default users are in the db, run the commands belows
    - docker-compose exec nodejs node test-checkRedis.js
    - docker-compose exec nodejs node test-checkDB.js
- Go to http://localhost:70/login.html
- Credentials: theuser / abc123


How to stop the app and clean up the data and Docker images:
- Run command: chmod +x stop-local.sh 
- Run command: ./stop-local.sh


