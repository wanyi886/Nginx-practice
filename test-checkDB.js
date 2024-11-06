require('dotenv').config();
const { initRedis, getRedisClient } = require('./src/config/redis.config');

const checkDatabase = async () => {
    try {
        
        await initRedis();
        const redisClient = getRedisClient();

        console.log('\n=== Database Contents ===\n');

        // Get all keys
        const allKeys = await redisClient.keys('*');
        console.log('Found keys:', allKeys);

        // Check if default users are in the database
        console.log('\n=== User Details ===\n');
        for (const key of allKeys) {
            if (key.startsWith('user:')) {
                const userData = await redisClient.hGetAll(key);
                console.log(`${key}:`, userData);
            }
        }

        await redisClient.quit();
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

checkDatabase();