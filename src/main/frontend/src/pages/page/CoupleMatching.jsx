import React, { useState } from 'react';
import apiClient from '../../utils/apiClient'; // apiClient를 임포트합니다

function CoupleMatching() {
    // FriendCode 입력 상태 관리
    const [friendCode, setFriendCode] = useState('');
    // 검색된 사용자 상태 관리
    const [user, setUser] = useState(null);
    // 에러 메시지 상태 관리
    const [error, setError] = useState('');
    // 요청 성공 상태 관리
    const [requestSent, setRequestSent] = useState(false);

    // FriendCode 입력 핸들러
    const handleFriendCodeChange = (event) => {
        setFriendCode(event.target.value);
    };

    // 사용자 검색 핸들러
    const handleSearchUser = async () => {
        try {
            setError('');
            setRequestSent(false);

            // API 호출을 통해 사용자를 검색 (GET 방식으로 friendCode를 path로 전달)
            if (!friendCode) {
                setError('친구 코드를 입력해주세요.');
                return;
            }

            const response = await apiClient.get(`/users/${friendCode}`);
            console.log(response.data); // 응답 데이터 확인
            setUser(response.data);
        } catch (error) {
            setUser(null);
            setError('사용자를 찾을 수 없습니다.');
        }
    };

    // 요청 전송 핸들러
    const handleSendRequest = async () => {
        try {
            if (!user || !user.friendCode) {
                setError('요청을 보낼 사용자가 없습니다.');
                return;
            }

            await apiClient.post('/send-request', { friendCode: user.friendCode });
            setRequestSent(true);
        } catch (error) {
            setError('요청을 보내지 못했습니다.');
        }
    };

    // 성별을 한글로 변환하는 함수
    const getKoreanSex = (sex) => {
        if (sex === 'MALE') return '남자';
        if (sex === 'FEMALE') return '여자';
        return '성별 정보 없음';
    };

    return (
        <div className="couple-app">
            <h1>커플 매칭</h1>

            {/* FriendCode 입력 필드 */}
            <input
                type="text"
                value={friendCode}
                onChange={handleFriendCodeChange}
                placeholder="친구 코드를 입력하세요"
            />
            <button onClick={handleSearchUser}>검색</button>

            {/* 검색된 사용자 표시 */}
            {user && (
                <div className="user-info">
                    <p>이름: {user.realName}</p>
                    <p>성별: {getKoreanSex(user.sex)}</p>
                    {/* isCouple이 true인 경우 */}
                    {user.isCouple ? (
                        <p>이 사용자는 이미 커플입니다.</p>
                    ) : (
                        <button onClick={handleSendRequest}>요청 보내기</button>
                    )}
                </div>
            )}

            {/* 요청이 성공적으로 전송된 경우 */}
            {requestSent && <p>요청이 성공적으로 전송되었습니다!</p>}

            {/* 에러 메시지 표시 */}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default CoupleMatching;
