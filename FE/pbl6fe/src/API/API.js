// import axios from "axios";

// export let endpoints = {
//     'register': '/user/api/userauths/register/',
//     'login': '/user/api/userauths/login/',

// };

// export default axios.create({
//     baseURL: 'http://127.0.0.1:8000/'
// })

import axios from "axios";
import Cookies from 'js-cookie'; // Sử dụng để lấy csrfToken từ cookies

export let endpoints = {
    'register': '/user/api/userauths/register/',
    'login': '/user/api/userauths/login/',
};

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

// Thêm CSRF token vào tất cả các request
API.interceptors.request.use(config => {
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken; // Thêm CSRF token vào header
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default API;
