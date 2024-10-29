const { v4: uuidv4 } = require('uuid');

const tabTokens = new Map();

const generateTabToken = (userId) => {
    const tabToken = uuidv4();
    tabTokens.set(tabToken, userId);
    return tabToken;
};

module.exports = {
    tabTokens,
    generateTabToken
};