import axios from 'axios';
import store from '@/store';

const api = axios.create({
    baseURL: 'https://api.sacsis.tech/api',
    validateStatus: function (status) {
        return status < 1000;
    }
});

api.interceptors.request.use((config) => {
    try {
        const token = store.getters.getToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }
    } catch { }
    return config;
})

export default api;