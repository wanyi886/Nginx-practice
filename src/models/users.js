const bcryptjs = require('bcryptjs');
const { getRedisClient, initRedis } = require('../config/redis.config');

const users = [
    { id: 1, username: 'theuser', password: bcryptjs.hashSync('abc123', 10) },
    { id: 2, username: 'TEST_USER', password: bcryptjs.hashSync('TEST&test', 10) }
];

const ensureClient = async() => {
    let redisClient = getRedisClient();
    if (!redisClient) {
        await initRedis();
        redisClient = getRedisClient();
    }
    return redisClient;
} 

const getUserByUsername = async(username) => {
    const redisClient = await ensureClient();
    
    const userId = await redisClient.get(`username:${username}`);
    
    if (!userId) return null;
    
    // this returns a special object [Object: null prototype], so need to convert it to regular object
    const user = await redisClient.hGetAll(`user:${userId}`);
    
    if (Object.keys(user).length === 0) return null;
    
    const finalUser = { ...user };

    return finalUser;
}

module.exports = {
    users,
    getUserById,
    getUserByUsername
};