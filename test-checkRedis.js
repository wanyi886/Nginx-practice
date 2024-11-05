require('dotenv').config();
const { initRedis } = require('./src/config/redis.config');

async function testRedisConnection() {
    try {
        console.log('Testing Redis connection...');
        console.log('REDIS_PASSWORD:', process.env.REDIS_PASSWORD ? 'Is set' : 'Not set');
        
        const client = await initRedis();
        
        // Test the connection with a simple set/get
        await client.set('test', 'Hello');
        const value = await client.get('test');
        console.log('Test value retrieved:', value);
        
        console.log('Redis connection test successful!');
        process.exit(0);
    } catch (error) {
        console.error('Redis connection test failed:', error);
        process.exit(1);
    }
}

testRedisConnection();