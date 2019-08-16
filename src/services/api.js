import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3000',
    //baseURL: 'https://appauth-rn.herokuapp.com',
});

export default api;