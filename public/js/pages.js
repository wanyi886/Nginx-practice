import { checkSession, redirectToHome } from './utils.js';

const initializePage = () => {
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', redirectToHome);

    checkSession();
};

document.addEventListener('DOMContentLoaded', initializePage);