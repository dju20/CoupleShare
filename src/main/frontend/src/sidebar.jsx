
import React, { useState } from 'react';
import './registerpage.css';
import {Link} from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className={`sidebar-toggle ${isOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>
                {isOpen ? '✖' : '☰'}
            </button>
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <h2><Link to="/" >Couple share</Link></h2>
                <ul>
                    <li><Link to="/" className="sidebar-list">Home</Link></li>
                    <li><Link to="/mypage" className="sidebar-list">My page</Link></li>
                    <li><Link to="/login" className="sidebar-list">Login</Link></li>
                    <li><Link to="/" className="sidebar-list">Home</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
