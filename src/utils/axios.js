import axios from 'axios';

const instanse = axios.create({
  // baseURL: 'https://rapid-back-6fsu0u79q-dimke85dev.vercel.app/api',
  baseURL: 'http://localhost:5000/api',
});

instanse.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instanse;
