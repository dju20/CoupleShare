import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import RegisterPage from "./registerpage";


//test
// 마이페이지 컴포넌트
const MyPage = () => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        axios.get('http://localhost:8080/api/user')
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>My Page</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <Link to="/">Back to Home Page</Link>
        </div>
    );
};

// 홈 페이지 컴포넌트
const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>Welcome to the Home Page!</p>
        <Link to="/mypage">Go to My Page</Link>
        <Link to="/register">Login</Link>
        <br/>

    </div>
);


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
            </Routes>
        </div>
    </Router>
);



export default App;
