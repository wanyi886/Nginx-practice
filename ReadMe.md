How to run the app:

On Localhost:
- Open .env.local file in the root directory
- Change environment variables
- Run command: chmod +x start-local.sh
- Run command: ./start-local.sh
- Go to http://localhost:2370/login.html

Notes:
- HTML + Nginx as Frontend,  Express as Backend
- Use bash script and docker-compose to host the app
- API:
    - POST /api/login
    - GET /api/check-session
    - GET /api/logout