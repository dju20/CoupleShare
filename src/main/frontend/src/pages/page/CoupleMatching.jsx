import React, { useState } from 'react';
import apiClient from '../../utils/apiClient'; // apiClient를 임포트합니다
import '../css/CoupleMatching.css';
import Header from "./header";
// import TestLogo from "../../img/Test-logo.png";

function CoupleMatching() {
    // 커플코드 입력 상태 관리
    const [EnterCode, setEnterCoupleCode] = useState('');
    // 발급된 커플코드 상태 관리
    const [IssuedCode, setIssuedCode] = useState('');
    // 연결된 커플 상태 관리
    const [isMatched, setIsMatched] = useState(false);
    // 에러 메시지 상태 관리 -IssueCode
    const [IssueError, setIssueError] = useState('');
    // 에러 메시지 상태 관리 -EnterCode
    const [EnterError, setEnterError] = useState('')

    // 커플코드 발급 핸들러 (GET 요청)
    const handleIssueCoupleCode = async () => {
        try {
            setIssueError('');
            setIsMatched(false);

            // API 호출을 통해 커플코드 발급 (GET 방식)
            const response = await apiClient.get('/couple/code');
            setIssuedCode(response.data.coupleCode); // 발급된 커플코드를 상태에 저장
        } catch (error) {
            setIssueError('커플 코드를 발급하지 못했습니다.');
        }
    };

    // 커플코드 입력 핸들러
    const handleEnterCoupleCode = (event) => {
        setEnterCoupleCode(event.target.value);
    };

    // 커플코드로 매칭 핸들러 (POST 요청)
    const handleMatchCouple = async () => {
        try {
            if (!EnterCode) {
                setEnterError('커플 코드를 입력해주세요.');
                return;
            }

            // API 호출을 통해 커플 매칭 (POST 방식)

            await apiClient.post('/couple/code/match', { EnterCode });
            setIsMatched(true);
        } catch (error) {
            setIsMatched(false);
            setEnterError('커플 매칭에 실패했습니다.');
        }
    };

    return (

        <div className="CM-container">
            <Header/>

            <div className="CM-MainPanel">

                {/*<div className="CM-LogoPlacehorder"> /!*로고 이미지 페널*!/*/}
                {/*    <img src={TestLogo} alt="Logo" className="CM-logo-img"/>*/}
                {/*</div>*/}

                <div className="CM-up-panel"> {/*커플 코드 발급 페널*/}
                    <div className="CM-IssueCode">
                        <button onClick={handleIssueCoupleCode}>Couple<br/>Code</button>
                        <div className="CM-IssueCodeMessage">
                        {IssuedCode && <p>발급된 커플 코드: {IssuedCode}</p>}
                            {IssueError && <p className="CM-IssueError">{IssueError}</p>}
                    </div>
                </div>
                    </div>

                <div className="CM-down-panel"> {/*커플 코드 입력 페널*/}
                    <div className="CM-EnterCode">
                        <button onClick={handleMatchCouple}>Couple<br/>Match</button>
                        <div className="CM-EnterCodeInput">
                        <input
                            type="text"
                            value={EnterCode}
                            onChange={handleEnterCoupleCode}/>
                            {EnterError && <p className="CM-EnterError">{EnterError}</p>}
                        </div>
                    </div>
                </div>

                {/* 매칭 결과 표시 -> 페이지 이동으로 변경 예정 */}
                {isMatched && <p>커플이 성공적으로 연결되었습니다!</p>}
            </div>
            </div>
    );
}

export default CoupleMatching;
