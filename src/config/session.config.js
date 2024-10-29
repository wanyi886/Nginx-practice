const session = require('express-session');

const RedisStore = require('connect-redis').default;
const { redisClient } = require('./redis.config');

const sessionStore = new RedisStore({ 
    client: redisClient 
});

const sessionConfig = (session({
    store: sessionStore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false, // Set to true if using HTTPS
    //   maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

module.exports = sessionConfig;