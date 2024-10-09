require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.NODE_APP_PORT;
// const host = process.env.NODE_APP_HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false, // Set to true if using HTTPS
    //   maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

const tabTokens = new Map();

app.use(express.static('public'));

const users = [
    { id: 1, username: 'theuser', password: bcryptjs.hashSync('abc123', 10) }
];

const sesionCookies = [
    { name: 'session1', value: 'value1' },
    { name: 'session2', value: 'value2' },
    { name: 'session3', value: 'value3' },
]
  
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (user && bcryptjs.compareSync(password, user.password)) {
        req.session.userId = user.id;
        
        // session cookie lasts until we close the browser completely, not just a single tab
        // All tabs and windows opened from the same browser instance share the same cookie jar
        // Cookies are shared among all tabs and windows that match the same origin
        // So if we need to use tab specific token with sessionStorage
        const tabToken = uuidv4();
        tabTokens.set(tabToken, user.id);
        
        sesionCookies.forEach(cookie => {
            res.cookie(cookie.name, cookie.value, {
                httpOnly: true
            })
        })

        res.json({ 
            redirect: '/landing.html', 
            message: 'Log in Successfully!', 
            tabToken: tabToken
        })

    } else {
        res.status(401).json({ message: 'Invalid credentials.'})
    }
});

app.get('/api/logout', (req, res) => {
    
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }

        sesionCookies.forEach(cookie => {
            res.clearCookie(cookie.name);
        });

        res.redirect('/login.html');
    });
});

app.get("/api/check-session", (req, res) => {
    const tabToken = req.query.tabToken;
    if (tabTokens.has(tabToken) && tabTokens.get(tabToken) === req.session.userId) {

        res.json({ isLoggedIn: true })
    } else {
        res.status(401).json({ redirect: '/login.html'})
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });