import { io } from 'socket.io-client';

const inProduction = process.env.NODE_ENV === 'production';
const url = (inProduction) ? 'http://localhost:5000' : 'http://localhost:5000';

export const socket = io(url);