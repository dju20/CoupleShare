import React, { useState } from 'react';
import './Login.css'; // 스타일시트를 import 합니다

const Login = () => {
    const [email, setEmail] = useState(''); // 이메일 상태 변수 선언
    const [password, setPassword] = useState(''); // 비밀번호 상태 변수 선언

    const handleSubmit = (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
        // 로그인 로직을 여기에 추가
        console.log('Email:', email); // 입력된 이메일 출력
        console.log('Password:', password); // 입력된 비밀번호 출력
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // 이메일 입력 핸들러
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


// export default function Login() {
//     return (
//         <div className="login">
//             <div className="Login Title">Login</div>
//             {/*Login 타이틀*/}
//
//             <div className="Login Content">
//                 <div className="Login ID">ID</div>
//                 {/*Login ID */}
//                 <div className="input ID"> {/*Login ID 입력*/}
//                     <input className="input" placeholder="ID"/> {/*Login ID 박스, 내부*/}
//                 </div>
//
//                 <div className="Login PW">PW</div>
//                 {/*Login PW 알림*/}
//                 <div className="input PW"> {/*Login PW 입력*/}
//                     <input className="input" placeholder="PW"/> {/*Login ID 박스, 내부*/}
//                 </div>
//
//
//                 <div> {/*Login 버튼*/}
//                     <button>
//                         Login
//                     </button>
//                 </div>
//             </div>
//         </div>
//
//     )
// }