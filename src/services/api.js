import axios from 'axios';
import store from '@/store';
import { baseApiUrl } from "@/global";

const api = axios.create({
    baseURL: baseApiUrl,
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
    } catch {
        return config;
    }
    return config;
})

export default api;