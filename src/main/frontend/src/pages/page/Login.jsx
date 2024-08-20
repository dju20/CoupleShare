import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/Login.css';
import TestLogo from '../../img/Test-logo.png';
import GoogleLogo from '../../img/Google-logo.png';
import KakaoLogo from '../../img/Kakao-logo.png';
import NaverLogo from '../../img/Naver-logo.png';
import Header from "./header";

const Login = () => {
    const [username, setUsername] = useState(''); // 아이디 상태 변수 선언
    const [password, setPassword] = useState(''); // 비밀번호 상태 변수 선언
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSubmit = async (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                throw new Error('Login request failed');
            }

            // 헤더에서 JWT 추출
            const authHeader = response.headers.get('Authorization');
            const token = authHeader ? authHeader.replace('Bearer ', '') : null;

            if (token) {
                console.log('Login successful, token:', token);
                localStorage.setItem('authToken', token);
                navigate('/home');
            } else {
                console.error('Token not received');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('로그인 실패');
            navigate('/login');
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`${provider} login clicked`);
        // +소셜 로그인 API 호출 처리 로직 추가
        const urls = {
            google: 'http://localhost:8080/oauth2/authorization/google',
            kakao: 'http://localhost:8080/oauth2/authorization/kakao',
            naver: 'http://localhost:8080/oauth2/authorization/naver'
        };

        window.location.href = urls[provider];

    };

    return (

        <div className="container">
            <Header/>

            <div className="left-panel">
                <div className="logo-placeholder">
                    <img src={TestLogo} alt="Logo" className="logo-img" />
                </div>
            </div>

            <div className="right-panel">

                <form className="LoginForm" onSubmit={handleSubmit}>
                <div className="login-form">
                    <input
                        type="text"
                        placeholder="아이디"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // 이메일 입력 핸들러
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 핸들러
                    />

                    <div className="social-logos"> {/* 소셜 로고 */}

                        <button type="button" className="social-login" onClick={() => handleSocialLogin('google')}>
                            <img src={GoogleLogo} alt="Google 로그인" className="social-logo-img"/>
                        </button>

                        <button type="button" className="social-login" onClick={() => handleSocialLogin('kakao')}>
                            <img src={KakaoLogo} alt="Kakao 로그인" className="social-logo-img"/>
                        </button>

                        <button type="button" className="social-login" onClick={() => handleSocialLogin('naver')}>
                            <img src={NaverLogo} alt="Naver 로그인" className="social-logo-img"/>
                        </button>
                        {/*type="button" 추가로 소셜 로그인 폼 제출을 트리거 하지 않아도 됨*/}

                    </div>

                    <div className="find">
                        <a href="/page/FindID" className="find-link">아이디</a>
                        <a style={{fontSize: '18px'}}> / </a>
                        <a href="/page/FindPW" className="find-link">비밀번호 찾기</a>
                    </div>

                    <button className="login-button" type="submit">로그인</button>

                </div>
                </form>
            </div>
        </div>
    );
};

export default Login;