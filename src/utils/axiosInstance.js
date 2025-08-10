import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// request interceptor to include the token in headers
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// response interceptor to handle errors globally
axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        // Handle unauthorized access, redirect to login
        console.error('Unauthorized access - redirecting to login');
        // Optionally, redirect to login page here
    } else if (error.response && error.response.status === 403) {
        console.error('Forbidden - you do not have permission to access this resource');
    } else {
        console.error('An error occurred:', error.message);
    }
    return Promise.reject(error);
});

export default axiosInstance;