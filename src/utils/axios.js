import axios from 'axios';

const instanse = axios.create({
  baseURL: 'https://rapid-back-3ngv4i30q-dimke85dev.vercel.app/api',
});

instanse.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instanse;
