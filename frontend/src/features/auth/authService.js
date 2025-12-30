import axios from 'axios';

// The URL of your backend API
// const API_URL = 'http://localhost:5000/api/auth/';
const BACKEND_DOMAIN = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BACKEND_DOMAIN}/api/auth/`;

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'signup', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

const updateProfile = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + 'profile', userData, config);

    if (response.data) {
        // Update local storage with new name/email/token
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const authService = {
    register,
    logout,
    login,
    updateProfile,
};

export default authService;