const redis = require('redis');

const redisPort = process.env.REDIS_PORT || 6379;
const redisPWD = process.env.REDIS_PASSWORD;

let redisClient = null;

const initRedis = async () => {

    if (!redisClient) {

        redisClient = redis.createClient({
            url: `redis://:${redisPWD}@redis:${redisPort}`
        })
    
        try {
            redisClient.on('error', err => {
                console.log('Redis client error: ', err)
            });
    
            await redisClient.connect();
            console.log('Connected to Redis.')
    
        } catch(err) { // only catch the errors occur during initial connection
            console.log('Failed to connect: ', err);
        }
    }

    return redisClient;

}

const getRedisClient = () => {
    if (!redisClient) {
        throw new Error('Redis client not initialized. Call initRedis() first.')
    }
    return redisClient; // return exsting client
}

module.exports ={ 
    getRedisClient,
    initRedis
}