// src/utils/apiClient.js
import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true // 쿠키를 요청에 포함시키기 위해 설정
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(config => {
    // localStorage에서 JWT를 가져와서 Authorization 헤더에 추가
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;
