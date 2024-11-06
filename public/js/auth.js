import { redirectToLogin } from "./utils.js";

import config from "../config/config.js";

const nodeHost = config.nodeHost;
const nodePort = config.nodePort;

const handleLogin = async (event) =>  {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`http://${nodeHost}:${nodePort}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            sessionStorage.setItem('tabToken', data.tabToken);
            window.location.href = '/home.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
    }
}

const handleLogout = async () => {
    const tabToken = sessionStorage.getItem('tabToken');
    
    try {
        const response = await fetch(`http://${nodeHost}:${nodePort}/api/logout?tabToken=${tabToken}`);
        const data = await response.json();
        sessionStorage.removeItem('tabToken');
        window.location.href = data.redirect || './login.html'; 
    } catch (error) {
        console.error('Logout error:', error);
        redirectToLogin();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
});

export {
    handleLogin,
    handleLogout
}