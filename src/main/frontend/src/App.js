import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/page/Login";
import RegisterPage from "./pages/page/registerpage";
import FindID from "./pages/page/FindID";
import HomePage from './pages/page/HomePage';
import MyPage from "./pages/page/mypage";
import CoupleMatching from "./pages/page/CoupleMatching";
import RedirectPage from "./pages/page/RedirectPage";

// 마이페이지 컴포넌트


// App 컴포넌트에서 라우팅을 설정
const App = () => (
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/mypage" element={<MyPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/FindID" element={<FindID/>}/>
                <Route path="/CoupleMatching" element={<CoupleMatching/>}/>
                <Route path="/redirect" element={<RedirectPage/>} />
                {/*<Route path="/FindPW" element={<FindPW />} />*/}
            </Routes>
        </div>
    </Router>
);


export default App;
