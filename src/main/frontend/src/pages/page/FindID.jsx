import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FindID.css';
import TestLogo from '../../img/Test-logo.png';

const FindID = () => {
    const [email, setEmail] = useState(''); // 이메일 상태 변수 선언
    const [name, setName] = useState('');
    const [findID, setfindID] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSubmit = async (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 리로드 방지

        const findIDData = {
            email: email,
            name: name
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
                throw new Error('Find Request failed');
            }

            const data = await response.json();
            setfindID(data.id);
            setShowPopup(true);

            alert('아이디 찾기 요청이 완료되었습니다.');
            navigate('/login'); // 로그인 페이지로 리디렉션

        }

        catch (error) {
            console.error('Error:', error);
            alert('아이디를 찾을 수 없습니다.');
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="F-ID-container">

            <div className="F-ID-left-panel">
                <div className="F-ID-logo-placehorder">
                    <img src={TestLogo} alt="Logo" className="logo-img"/>
                </div>
            </div>

            <div className="F-ID-right-panel">
                <form className="F-ID-find-form" onSubmit={handleSubmit}>

                    <input
                        type="name"
                        placeholder="이름을 입력하세요"
                        className="input-field-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="이메일 주소를 입력하세요"
                        className="input-field-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button className="F-ID-Find-button" type="submit">아이디 찾기</button>
                </form>

                {findID && (
                    <div className={`F-ID-Show-id ${showPopup ? 'show' : ''}`} onClick={handleClosePopup}>
                        찾은 아이디: {findID}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindID;
