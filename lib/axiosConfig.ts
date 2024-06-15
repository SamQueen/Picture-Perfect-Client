import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000', // Your API base URL
    timeout: 5000, // 5 second timeout
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export default instance;