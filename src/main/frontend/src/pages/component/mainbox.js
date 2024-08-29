import React from 'react';
import { Link } from "react-router-dom";
import "../css/mainbox.css";

function MainBox({ title, name, link, className }) {
    return (
        <div className={`mainbox ${className}`}>
            <h1>{title}</h1>
            <button className="mainboxbutton">
                {link ? <Link to={link}>{name}</Link> : name}
            </button>
        </div>
    );
}

export default MainBox;