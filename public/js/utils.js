import config from "../config/config.js";

const nodeHost = config.nodeHost;
const nodePort = config.nodePort;

const checkSession = async () => {
    const tabToken = sessionStorage.getItem('tabToken');

    if (!tabToken) {
        redirectToLogin();
        return false;
    }

    try {
        const response = await fetch(`http://${nodeHost}:${nodePort}/api/check-session?tabToken=${tabToken}`, {
            headers: {
                'Authorization': `Bearer ${tabToken}`
            },
            credentials: 'include'
        });

        if (response.status === 401) {
            sessionStorage.removeItem('tabToken');
            redirectToLogin();
            return false;
        }
        return true;
    } catch (error) {
        console.error('Session check error:', error);
        redirectToLogin();
        return false;
    }
};


const redirectToLogin = () => {
    window.location.href = '../login.html';
};

const redirectToHome = () => {
    window.location.href = '../home.html';
};


export {
    checkSession,
    redirectToLogin,
    redirectToHome,
};