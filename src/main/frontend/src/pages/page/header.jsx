import {Link} from "react-router-dom";
import Sidebar from "../component/sidebar";
import React, {useState} from "react";
import "../css/header.css"
import logoimage from '../../img/Test-logo.png'


const Header = () => {
    const [LoggedIn, setLoggedIn] = useState(false); // 로그인 상태를 관리하는 state

    /*const handleLogin = () => {
        setLoggedIn(true); // 로그인 시 상태 변경
    };*/

    const handleLogout = () => {
        setLoggedIn(false); // 로그아웃 시 상태 변경
    };


return (
    <div>
        <nav className="header">
            <Link to="/" style={{textDecoration: "none", color: "black", textAlign: "center"}}
                  className="header-home"><img src={logoimage} alt="Logo" className="Logoimg"></img></Link>
            {LoggedIn ? (
                <button onClick={handleLogout} className="header-logout">Logout</button>
            ) : (
                <Link to="/login" className="header-login">Login</Link>
            )}
            <Link to="/register" className="header-register">register</Link>
        </nav>


        <Sidebar/>
    </div>
    );

};

export default Header;

