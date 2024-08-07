import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import TestLogo from '../img/Test-logo.png';
import GoogleLogo from '../img/Google-logo.png';
import KakaoLogo from '../img/Kakao-logo.png';
import NaverLogo from '../img/Naver-logo.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                throw new Error('Login request failed');
            }

            const authHeader = response.headers.get('Authorization');
            const token = authHeader ? authHeader.replace('Bearer ', '') : null;

            if (token) {
                console.log('Login successful, token:', token);
                localStorage.setItem('authToken', token);
                navigate('/');
            } else {
                console.error('Token not received');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('로그인 실패');
        }
    };

    const handleSocialLogin = (provider) => {
        // 소셜 로그인 제공자의 인증 URL로 리디렉션
        const urls = {
            google: 'http://localhost:8080/oauth2/authorization/google',
            kakao: 'http://localhost:8080/oauth2/authorization/kakao',
            naver: 'http://localhost:8080/oauth2/authorization/naver'
        };

        window.location.href = urls[provider];
    };

    return (
        <div className="container">
            <div className="left-panel">
                <div className="logo-placeholder">
                    <img src={TestLogo} alt="Logo" className="logo-img" />
                </div>
            </div>
            <div className="right-panel">
                <div className="nav">
                    <a href="/register" className="nav-link">SIGNUP</a>
                    <a href="/login" className="nav-link">LOGIN</a>
                </div>
                <div className="test-box">
                </div>
                <div className="login-form">
                    <input
                        type="text"
                        placeholder="아이디"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="social-logos">
                        <button className="social-login" onClick={() => handleSocialLogin('google')}>
                            <img src={GoogleLogo} alt="Google 로그인" className="social-logo" />
                        </button>
                        <button className="social-login" onClick={() => handleSocialLogin('kakao')}>
                            <img src={KakaoLogo} alt="Kakao 로그인" className="social-logo" />
                        </button>
                        <button className="social-login" onClick={() => handleSocialLogin('naver')}>
                            <img src={NaverLogo} alt="X 로그인" className="social-logo" />
                        </button>
                    </div>

                    <div className="find">
                        <a href="/FindID" className="find-link">아이디</a>
                        <a> / </a>
                        <a href="/FindPW" className="find-link">비밀번호 찾기</a>
                    </div>

                    <button className="login-button" onClick={handleSubmit}>로그인</button>
                    {/* 로그인 버튼 */}
                </div>
            </div>
        </div>
    );
};

export default Login;
