import axios from 'axios';
import store from '@/store';

const api = axios.create({
    baseURL: 'https://sacsis-api.herokuapp.com/api',
    validateStatus: function (status) {
        return status < 1000;
    }
});

api.interceptors.request.use((config) => {
    const token = store.getters.getToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
})

export default api;