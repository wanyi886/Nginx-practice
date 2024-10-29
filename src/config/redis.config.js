const redis = require('redis');

const redisPort = process.env.REDIS_PORT || 6379;
const redisPWD = process.env.REDIS_PASSWORD;

// initialize a redis connection
const redisClient = redis.createClient({
    url:`redis://localhost:${redisPort}`,
    password: redisPWD
});


const initRedis = async () => {

    try {
        await redisClient.connect();
        console.log('Connected to Redis.')

    } catch(err) { // only catch the errors occur during initial connection
        console.log('Failed to connect: ', err);
    }

    // catch other errors happened throughout the connection lifetime
    redisClient.on('error', err => {
        console.log('Redis client error: ', err)
    })

}

module.exports ={
    redisClient,
    initRedis
}