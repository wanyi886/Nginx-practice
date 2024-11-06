import { redirectToLogin, redirectToHome } from "./utils.js";

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
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            sessionStorage.setItem('tabToken', data.tabToken);
            redirectToHome();
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
        const response = await fetch(`http://${nodeHost}:${nodePort}/api/logout?tabToken=${tabToken}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tabToken}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
        }
        sessionStorage.removeItem('tabToken');
        redirectToLogin();
    } catch (error) {
        console.error('Logout error:', error);
        redirectToLogin();
    }
}

const initializeAuth = () => {
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
};

document.addEventListener('DOMContentLoaded', initializeAuth);

export {
    handleLogin,
    handleLogout
}