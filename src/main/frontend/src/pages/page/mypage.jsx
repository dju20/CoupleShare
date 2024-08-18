import React from "react";
import apiClient from "../../utils/apiClient";
import {Link} from "react-router-dom";

const MyPage = () => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [apiData, setApiData] = React.useState(null);
    const [apiLoading, setApiLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState(null);

    React.useEffect(() => {
        // 사용자 정보 요청
        apiClient.get('/user')
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleApiCall = async () => {
        setApiLoading(true);
        setApiError(null);
        try {
            // 테스트 API 호출
            const response = await apiClient.get('/app/test');
            setApiData(response.data);
        } catch (error) {
            setApiError(error);
        } finally {
            setApiLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>My Page</h1>
            <p>Name: {user.realName}</p>
            <p>Gender: {user.sex}</p>
            <Link to="/">Back to Home Page</Link>
        </div>
    );
};

export default MyPage