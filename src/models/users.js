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

const getUserById = async (id) => {
    const redisClient = await ensureClient();
    const user = await redisClient.hGetAll(`user:${id}`);
    if (!user.id) return null;
    return user;
};

const getUserByUsername = async(username) => {
    const redisClient = ensureClient();
    const userId = await redisClient.get(`username:${username}`);
    if (!userId) return null;
    return getUserById(userId);
}

module.exports = {
    users,
    getUserById,
    getUserByUsername
};