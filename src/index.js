require('dotenv').config();
const express = require('express');
const { initRedis } = require('./config/redis.config');
const sessionConfig = require('./config/session.config');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.NODE_APP_PORT;
// const host = process.env.NODE_APP_HOST;

initRedis();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);

app.use(express.static('public'));

app.use('/api', authRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});