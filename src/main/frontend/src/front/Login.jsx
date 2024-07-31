import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import 합니다
import './Login.css'; // 스타일시트를 import 합니다

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

            // 헤더에서 JWT 추출
            const authHeader = response.headers.get('Authorization');
            const token = authHeader ? authHeader.replace('Bearer ', '') : null;

            if (token) {
                console.log('Login successful, token:', token);
                // 로그인 성공 후 처리 로직 추가
                // 예: localStorage에 저장하고 홈으로 리디렉션
                localStorage.setItem('authToken', token);
                window.location.href = '/home'; // 홈 페이지로 리디렉션
            } else {
                console.error('Token not received');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('로그인 실패');
            // 로그인 실패 후 처리 로직 추가
        }
    };

    return (
        <div className="container"> {/* 컨테이너 */}
            <div className="left-panel"> {/* 왼쪽 패널 */}
                <div className="logo-placeholder"></div> {/* 로고 자리 */}
            </div>
            <div className="right-panel"> {/* 오른쪽 패널 */}
                <div className="nav"> {/* 네비게이션 링크 */}
                    <a href="#" className="nav-link">SIGNUP</a> {/* 회원가입 링크 */}
                    <a href="#" className="nav-link">LOGIN</a> {/* 로그인 링크 */}
                </div>
                <div className="login-form"> {/* 로그인 폼 */}
                    <input
                        type="text"
                        placeholder="아이디"
                        className="input-field"
                        value={username} // email 대신 username 사용
                        onChange={(e) => setUsername(e.target.value)} // 아이디 입력 핸들러
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 핸들러
                    />
                    <div className="social-icons"> {/* 소셜 아이콘 */}
                        <span className="icon">📮</span> {/* TV 아이콘 */}
                        <span className="icon">📧</span> {/* 메시지 아이콘 */}
                        <span className="icon">🔐</span> {/* 트위터 아이콘 */}
                    </div>
                    <a href="#" className="forgot-link">아이디 / 비밀번호 찾기</a> {/* 비밀번호 찾기 링크 */}
                    <button className="login-button" onClick={handleSubmit}>로그인</button> {/* 로그인 버튼 */}
                </div>
            </div>
        </div>
    );
};

export default Login; // Login 컴포넌트를 내보냅니다
