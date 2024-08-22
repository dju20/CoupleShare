import React, { useState } from 'react';
import apiClient from '../../utils/apiClient'; // apiClient를 임포트합니다

function CoupleMatching() {
    // 커플코드 입력 상태 관리
    const [coupleCode, setCoupleCode] = useState('');
    // 발급된 커플코드 상태 관리
    const [generatedCode, setGeneratedCode] = useState('');
    // 연결된 커플 상태 관리
    const [isMatched, setIsMatched] = useState(false);
    // 에러 메시지 상태 관리
    const [error, setError] = useState('');

    // 커플코드 입력 핸들러
    const handleCoupleCodeChange = (event) => {
        setCoupleCode(event.target.value);
    };

    // 커플코드 발급 핸들러 (GET 요청)
    const handleGenerateCode = async () => {
        try {
            setError('');
            setIsMatched(false);

            // API 호출을 통해 커플코드 발급 (GET 방식)
            const response = await apiClient.get('/couple/code');
            setGeneratedCode(response.data.coupleCode); // 발급된 커플코드를 상태에 저장
        } catch (error) {
            setError('커플 코드를 발급하지 못했습니다.');
        }
    };

    // 커플코드로 매칭 핸들러 (POST 요청)
    const handleMatchCouple = async () => {
        try {
            if (!coupleCode) {
                setError('커플 코드를 입력해주세요.');
                return;
            }

            // API 호출을 통해 커플 매칭 (POST 방식)
            await apiClient.post('/couple/code', { coupleCode });
            setIsMatched(true);
        } catch (error) {
            setIsMatched(false);
            setError('커플 매칭에 실패했습니다.');
        }
    };

    return (
        <div className="couple-app">
            <h1>커플 매칭</h1>

            {/* 커플코드 발급 문구와 버튼 */}
            <div className="generate-code-section">
                <p>커플코드가 없으신가요?</p>
                <button onClick={handleGenerateCode}>커플 코드 발급</button>
                {generatedCode && <p>발급된 커플 코드: {generatedCode}</p>}
            </div>

            {/* 커플코드 입력 문구와 필드 */}
            <div className="match-code-section">
                <p>이미 커플코드를 발급하셨나요?</p>
                <input
                    type="text"
                    value={coupleCode}
                    onChange={handleCoupleCodeChange}
                    placeholder="커플 코드를 입력하세요"
                />
                <button onClick={handleMatchCouple}>매칭</button>
            </div>

            {/* 매칭 결과 표시 */}
            {isMatched && <p>커플이 성공적으로 연결되었습니다!</p>}

            {/* 에러 메시지 표시 */}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default CoupleMatching;
