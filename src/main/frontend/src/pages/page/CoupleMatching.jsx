import React, { useState } from 'react';
import apiClient from '../../utils/apiClient';
import '../css/CoupleMatching.css';
import Header from "./header";

function CoupleMatching() {
    const [coupleCode, setCoupleCode] = useState('');
    const [IssuedCode, setIssuedCode] = useState('');
    const [isMatched, setIsMatched] = useState(false);
    const [IssueError, setIssueError] = useState('');
    const [EnterError, setEnterError] = useState('');

    // 커플코드 발급 핸들러 (GET 요청)
    const handleIssueCoupleCode = async () => {
        try {
            setIssueError('');
            setIsMatched(false);

            // API 호출을 통해 커플코드 발급 (GET 방식)
            const response = await apiClient.get('/couple/code');

            // 응답 DTO에서 커플 코드를 가져옴
            setIssuedCode(response.data.coupleCode);
        } catch (error) {
            setIssueError('커플 코드를 발급하지 못했습니다.');
        }
    };

    // 커플코드 입력 핸들러
    const handleEnterCoupleCode = (event) => {
        setCoupleCode(event.target.value);
    };

    // 커플코드로 매칭 핸들러 (POST 요청)
    const handleMatchCouple = async () => {
        try {
            if (!coupleCode) {
                setEnterError('커플 코드를 입력해주세요.');
                return;
            }

            // API 호출을 통해 커플 매칭 (POST 방식)
            await apiClient.post('/couple/code', { coupleCode });
            setIsMatched(true);
        } catch (error) {
            setIsMatched(false);
            setEnterError('커플 매칭에 실패했습니다.');
        }
    };

    return (
        <div className="CM-Container">
            <Header/>
            <div className="CM-SubContainer">

            <div className="CM-MainPanel">
                <div className="CM-up-panel">
                    <div className="CM-IssueCode">
                        <button onClick={handleIssueCoupleCode}>Couple<br/>Code</button>
                        <div className="CM-IssueCodeMessage">
                            {IssuedCode && <p>발급된 커플 코드: {IssuedCode}</p>}
                            {IssueError && <p className="CM-IssueError">{IssueError}</p>}
                        </div>
                    </div>
                </div>

                <div className="CM-down-panel">
                    <div className="CM-EnterCode">
                        <button onClick={handleMatchCouple}>Couple<br/>Match</button>
                        <div className="CM-EnterCodeInput">
                            <input
                                type="text"
                                value={coupleCode}
                                onChange={handleEnterCoupleCode}
                            />
                            {EnterError && <p className="CM-EnterError">{EnterError}</p>}
                        </div>
                    </div>
                </div>

                {isMatched && <p>커플이 성공적으로 연결되었습니다!</p>}
            </div>
            </div>
        </div>
    );
}

export default CoupleMatching;
