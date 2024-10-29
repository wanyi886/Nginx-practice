const bcryptjs = require('bcryptjs');

const users = [
    { id: 1, username: 'theuser', password: bcryptjs.hashSync('abc123', 10) },
    { id: 2, username: 'TEST_USER', password: bcryptjs.hashSync('TEST&test', 10) }
];

module.exports = {
    users
};