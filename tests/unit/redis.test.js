require('dotenv').config();

jest.mock('redis', () => {
    const mockConnect = jest.fn().mockResolvedValue(); // we use this because connect() is async in the codes
    const mockOn = jest.fn(); // for regular function
    const mockClient = {
        connect: mockConnect,
        on: mockOn
    };
    return {
        createClient: jest.fn(() => mockClient)
    }
});

const redis = require('redis');
const { initRedis } = require("../../src/config/redis.config");

const getMockClient = () => {
    return redis.createClient();
};

describe('Redis Configuration', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create redis client with configuration', async () => {
        await initRedis();

        expect(redis.createClient).toHaveBeenCalledWith({
            url: 'redis://localhost:6379',
            password: process.env.REDIS_PASSWORD
        })
    });

    it('should connect successfully', async () => {
        const mockClient = getMockClient();
        await initRedis();
        expect(mockClient.connect).toHaveBeenCalled();
    })
})