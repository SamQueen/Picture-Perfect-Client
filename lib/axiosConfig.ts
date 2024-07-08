import axios from 'axios';

const inProduction = process.env.NODE_ENV === "production";

const devUrl = 'http://localhost:5000';
//const productionUrl = 'https://api.pictureper.com';
const productionUrl = 'https://www.pictureper.com';

const instance = axios.create({
    baseURL: inProduction ? productionUrl : devUrl, // Your API base URL
    timeout: 5000, // 5 second timeout
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export default instance;