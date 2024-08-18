import {Link} from "react-router-dom";
import React from "react";

const HomePage = () => {

    return (
        <div>
            <h1>Couple Share</h1>
            <p>Welcome to the CoupleShare</p>
            <Link to="/mypage">Go to My Page</Link>
            <br/>
        </div>
    );
};

export default  HomePage;