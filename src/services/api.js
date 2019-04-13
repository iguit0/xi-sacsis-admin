import axios from 'axios';
import store from '@/store'

const api = axios.create({
    baseURL: 'https://sacsis-api.herokuapp.com/api',
    validateStatus: function (status) {
        return status < 1000;
    }
});

//api.interceptors.response.use(success, error);

api.interceptors.request.use((config) => {
    try {
        const token = store.getters.getToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            delete config.headers.Authorization
        }
        return config;

    } catch (err) {
        console.log('caiu no catch');
        console.log(err)
    }
})

export default api;