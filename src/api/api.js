import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.12:8080/api', //Cambiar este baseURL tomando en cuenta la IP.
  timeout: 5000,
});

export default api;
