const redis = require('redis');

const redisPort = process.env.REDIS_PORT || 6379;
const redisPWD = process.env.REDIS_PASSWORD;

let redisClient = null;

const initRedis = async () => {
    
    // initialize a redis connection
    redisClient = redis.createClient({
        url:`redis://localhost:${redisPort}`,
        password: redisPWD
    });

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

module.exports ={ 
    getRedisClient: () => redisClient,
    initRedis
}