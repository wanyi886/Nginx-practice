import { handleLogout } from './auth.js';
import { checkSession } from './utils.js';

const initializePage = () => {
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', handleLogout);

    checkSession();
}

document.addEventListener('DOMContentLoaded', initializePage);