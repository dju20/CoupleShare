import {Link} from "react-router-dom";
import React from "react";
import header from "./header";
import Header from "./header";
import styles from "../css/header.css"

const HomePage = () => {

    return (

        <div>
            <Header/>
            <h1>Couple Share</h1>
            <p>Welcome to the CoupleShare</p>
            <Link to="/mypage">Go to My Page</Link>
            <br/>
        </div>
    );
};

export default  HomePage;