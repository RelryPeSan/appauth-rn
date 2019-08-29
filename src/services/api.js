import axios from 'axios';

// Servidor local
const baseURL = 'http://localhost:3000';

// Servidor online - Heroku
// const baseURL = 'https://appauth-rn.herokuapp.com';

const api = axios.create({
  baseURL,
});

console.log(`Conectado na base: ${baseURL}`);

export default api;
