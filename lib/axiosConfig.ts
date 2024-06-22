import axios from 'axios';

const devUrl = 'http://localhost:5000';
const productionUrl = 'https://api.pictureper.com';//'https://limitless-gorge-84901-46983064217d.herokuapp.com'

const instance = axios.create({
    baseURL: productionUrl, // Your API base URL
    timeout: 5000, // 5 second timeout
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export default instance;