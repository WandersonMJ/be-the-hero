import axios from 'axios';

const api = axios.create({
    baseURL: '192.168.15.15:3333'
})

export default api;