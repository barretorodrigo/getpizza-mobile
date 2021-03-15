import axios from 'axios';

const api = axios.create({
    baseURL: 'https://getpizzar-tiara.herokuapp.com/'
});

export default api;