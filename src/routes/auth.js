
const express = require('express');
const { getUserByUsername } = require('../models/users');
const bcryptjs = require('bcryptjs');
const router = express.Router();
const { generateTabToken, tabTokens } = require('../utils/token');
const sessionCookies = require('../utils/session.cookies')

const host = process.env.NGINX_HOST;
const port = process.env.NGINX_PORT;

router.post('/login', async (req, res) => {

    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    console.log("uuuuu", user);

    if (user && bcryptjs.compareSync(password, user.password)) {
        req.session.userId = user.id;
        
        // session cookie lasts until we close the browser completely, not just a single tab
        // All tabs and windows opened from the same browser instance share the same cookie jar
        // Cookies are shared among all tabs and windows that match the same origin
        // So if we need to use tab specific token with sessionStorage
        const tabToken = generateTabToken(user.id);
        tabTokens.set(tabToken, user.id);
        
        sessionCookies.forEach(cookie => {
            res.cookie(cookie.name, cookie.value, {
                httpOnly: true
            })
        })

        res.json({ 
            redirect: `http://${host}:${port}/home.html`, 
            message: 'Log in Successfully!', 
            tabToken: tabToken
        })

    } else {
        res.status(401).json({ message: 'Invalid credentials.'})
    }
});


router.post('/logout', (req, res) => {
    
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ message: 'Some errors happened during log out process.'})
            console.error('Error destroying session:', err);
        }

        sessionCookies.forEach(cookie => {
            res.clearCookie(cookie.name);
        });

        res.status(200).json({ message: 'Log out successfully.' })
    });
});

router.get("/check-session", (req, res) => {
    const tabToken = req.query.tabToken;
    if (tabTokens.has(tabToken) && tabTokens.get(tabToken) === req.session.userId) {

        res.json({ isLoggedIn: true })
    } else {
        res.status(401).json({ redirect: '/login.html'})
    }
});

module.exports = router;