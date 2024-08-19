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
import MyPage from "./pages/page/mypage";

// 마이페이지 컴포넌트




// App 컴포넌트에서 라우팅을 설정
const App = () => (
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/FindID" element={<FindID />} />
                <Route path="/CoupleMatching" element={<CoupleMatching />} />
                {/*<Route path="/FindPW" element={<FindPW />} />*/}
            </Routes>
        </div>
    </Router>
);



export default App;
