const bcryptjs = require('bcryptjs');
const { users } = require('../../src/models/users');

describe('Default Users Exists & have required properties', () => {
    it('should have 2 users', ()=> {
        expect(users.length).toBe(2);
    });

    it('should have users with required properties', () => {
        users.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('password');
        })
    });
});

describe('First User (theuser) verification', () => {
    let theuser;

    beforeEach(() => {
        theuser = users.find( user => user.username === 'theuser');
    });

    it('should exit', () => {
        expect(theuser).toBeDefined();
    });

    it('should have correct hashed password', () => {
        const isValid = bcryptjs.compareSync('abc123', theuser.password);
        expect(isValid).toBe(true);
    })
});

describe('Second User (TEST_USER) verification', () => {
    let test_user;

    beforeEach(() => {
        test_user = users.find( user => user.username === 'TEST_USER');
    });

    it('should exit', () => {
        expect(test_user).toBeDefined();
    });

    it('should have correct hashed password', () => {
        const isValid = bcryptjs.compareSync('TEST&test', test_user.password);
        expect(isValid).toBe(true);
    })
})