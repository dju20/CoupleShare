import React, { useState } from 'react';
import apiClient from './utils/apiClient'; // apiClient를 임포트합니다

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

            // API 호출을 통해 사용자를 검색 (POST 방식으로 JSON 데이터 전송)
            if (!friendCode) {
                setError('FriendCode is required');
                return;
            }

            const response = await apiClient.post('/app/search/user', { friendCode });
            console.log(response.data); // 응답 데이터 확인
            setUser(response.data);
        } catch (error) {
            setUser(null);
            setError('User not found');
        }
    };

    // 요청 전송 핸들러
    const handleSendRequest = async () => {
        try {
            if (!user || !user.friendCode) {
                setError('No user found to send request');
                return;
            }

            await apiClient.post('/send-request', { friendCode: user.friendCode });
            setRequestSent(true);
        } catch (error) {
            setError('Failed to send request');
        }
    };

    return (
        <div className="couple-app">
            <h1>Couple App</h1>

            {/* FriendCode 입력 필드 */}
            <input
                type="text"
                value={friendCode}
                onChange={handleFriendCodeChange}
                placeholder="Enter FriendCode to search"
            />
            <button onClick={handleSearchUser}>Search</button>

            {/* 검색된 사용자 표시 */}
            {user && (
                <div className="user-info">
                    <p>User found: {user.realName} ({user.friendCode})</p>
                    <p>Sex: {user.sex}</p>
                    {/* isCouple이 true인 경우 */}
                    {user.isCouple ? (
                        <p>This user is already in a couple.</p>
                    ) : (
                        <button onClick={handleSendRequest}>Send Request</button>
                    )}
                </div>
            )}

            {/* 요청이 성공적으로 전송된 경우 */}
            {requestSent && <p>Request sent successfully!</p>}

            {/* 에러 메시지 표시 */}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default CoupleMatching;
