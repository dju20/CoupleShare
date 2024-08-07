import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindID.css';

const FindID = () => {
    const [email, setEmail] = useState(''); // 이메일 상태 변수 선언
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSubmit = async (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        const findIDData = {
            email: email
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/find-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(findIDData)
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            alert('아이디 찾기 요청이 완료되었습니다.');
            navigate('/login'); // 로그인 페이지로 리디렉션
        } catch (error) {
            console.error('Error:', error);
            alert('아이디 찾기 요청에 실패했습니다.');
        }
    };

    return (
        <div className="find-id-container"> {/* 컨테이너 */}
            <h2 className="find-id-title">아이디 찾기</h2> {/* 페이지 제목 */}
            <form className="find-id-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="이메일 주소를 입력하세요"
                    className="find-id-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // 이메일 입력 핸들러
                    required
                />
                <button type="submit" className="find-id-button">아이디 찾기</button> {/* 제출 버튼 */}
            </form>
        </div>
    );
};

export default FindID;
