// src/pages/RedirectPage.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleRedirection = () => {
            // 쿠키에서 JWT 토큰 읽기
            const cookies = document.cookie.split(';');
            let token = null;

            cookies.forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name === 'authToken') {
                    token = decodeURIComponent(value); // 쿠키 값 디코딩
                }
            });

            // 로컬 스토리지에 토큰 저장 및 쿠키 삭제
            if (token) {
                localStorage.setItem('authToken', token);
                console.log('Token stored in localStorage:', token);

                // 비동기로 쿠키 삭제 처리
                setTimeout(() => {
                    document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    console.log('authToken cookie deleted');
                }, 0);

                // 메인 홈으로 리디렉션
                console.log('Redirecting to home...');
                navigate('/');
            } else {
                console.error('Token not found in cookies or not set in localStorage');
                // 로그인 실패 페이지나 안내 페이지로 리디렉션
                console.log('Redirecting to login...');
                navigate('/login');
            }
        };

        handleRedirection();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default RedirectPage;
