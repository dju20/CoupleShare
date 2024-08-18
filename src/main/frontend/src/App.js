import React,{ useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import RegisterPage from "./pages/page/registerpage";
import Login from "./front/Login";
import apiClient from './utils/apiClient';
import RedirectPage from "./pages/page/RedirectPage";
import styles from "./App.css"
import FindID from "./front/FindID";
import handleSubmit from "./front/Login";
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
const App = () => {

    return (
        <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/redirect" element={<RedirectPage/>}/>
                    <Route path="/mypage" element={<MyPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
                    <Route path="/FindID" element={<FindID/>}/>
                    {/*<Route path="/FindPW" element={<FindPW />} />*/}
                </Routes>
        </Router>
    );
};


export default App;
