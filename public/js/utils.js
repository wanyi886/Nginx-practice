const checkSession = async () => {
    const tabToken = sessionStorage.getItem('tabToken');

    if (!tabToken) {
        redirectToLogin();
        return false;
    }

    try {
        const response = await fetch(`/api/check-session?tabToken=${tabToken}`);

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

// Navigation helper functions
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