import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Login from "./pages/page/Login";
import RegisterPage from "./pages/page/registerpage";
import apiClient from './utils/apiClient';
import FindID from "./pages/page/FindID";
import RedirectPage from "./pages/page/RedirectPage";
import styles from "./App.css"
import HomePage from './pages/page/HomePage';

// 마이페이지 컴포넌트
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




// App 컴포넌트에서 라우팅을 설정
const App = () => (
    <Router>
        <div>
            <nav>
                <Link to="/">Home</Link> | <Link to="/mypage">My Page</Link>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/FindID" element={<FindID />} />
                {/*<Route path="/FindPW" element={<FindPW />} />*/}
            </Routes>
        </div>
    </Router>
);



export default App;
