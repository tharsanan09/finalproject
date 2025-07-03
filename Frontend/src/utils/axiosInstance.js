import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // register
  headers: {
    'Content-Type': 'application/json'
  }
});

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // login
  withCredentials: true,
});

export default axiosInstance;



