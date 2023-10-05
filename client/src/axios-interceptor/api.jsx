// api.js
import axios from 'axios';
import BASE_URL from '../connect';
import store from '../sagas/configureStore';
import { logout, refreshAccessTokenSuccess } from '../sagas/auth/authSlice';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(config => {
    config.withCredentials = true;
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    const newAccessToken = response.headers['new-access-token'];
    const oldAccessToken = newAccessToken
    if (oldAccessToken === newAccessToken) return response
    if (newAccessToken) {
        api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;  // Cập nhật headers
        store.dispatch(refreshAccessTokenSuccess(newAccessToken));
        localStorage.setItem('authToken', newAccessToken);
    }
    return response;
}, (error) => {
    if (error.response && error.response.data.status === 'notAuth') {
        store.dispatch(logout());
        toast.error('Phiên bản đăng nhập đã hết hạn!')
    }
    return Promise.reject(error);
});

export default api;