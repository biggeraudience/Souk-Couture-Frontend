// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Your backend URL from .env
  withCredentials: true, // Important for sending cookies (e.g., for sessions/JWTs)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;