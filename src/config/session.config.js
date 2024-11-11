const session = require('express-session');

const RedisStore = require('connect-redis').default;
const { getRedisClient } = require('./redis.config');

const redisClient = getRedisClient();

const sessionStore = new RedisStore({ 
    client: redisClient 
});

const sessionConfig = (session({
    store: sessionStore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 
    }
}));

module.exports = sessionConfig;