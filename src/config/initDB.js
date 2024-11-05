require('dotenv').config();
const { getRedisClient, initRedis } = require('./redis.config');
const { users } = require('../models/users');  

const initializeDatabase = async () => {
    await initRedis();
    const redisClient = getRedisClient();

    try {
        for (const user of users) {
            
            // use hash instead of simple key-value, cuase we can update only a single field
            // use "user:" prefix because it's easier to find all the keys contains user
            // https://redis.io/docs/latest/commands/hset/
            await redisClient.hSet(`user:${user.id}`, {
                username: user.username,
                password: user.password
            });

            // create a simple key-value pair for username lookup
            await redisClient.set(`username:${user.username}`, user.id);
        }

        // SCARD in redis: returns number of elements of the set stored at key
        // const totalUsers = await redisClient.sCard('users:ids')
        console.log(`Successfully initialized database.`);
        
        return true;
    } catch (error){
        console.error('Error happened during initialize database:', error);
        await redisClient.quit();

    }
}

initializeDatabase();