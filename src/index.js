
require('dotenv').config();
const express = require('express');
const { initRedis } = require('./config/redis.config');
const authRoutes = require('./routes/auth');

const startServer = async () => {
    try {
        // Initialize Redis and creates the connection
        await initRedis();
        
        // Then create the Express app and import session config
        const app = express();
        const sessionConfig = require('./config/session.config');
        const port = process.env.NODE_APP_PORT;

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(sessionConfig); // use the existing connection

        app.use(express.static('public'));

        app.use('/api', authRoutes);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer().catch(error => {
    console.error('Server startup failed:', error);
    process.exit(1);
});