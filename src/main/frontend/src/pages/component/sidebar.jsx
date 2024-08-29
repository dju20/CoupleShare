
import React, { useState } from 'react';
import {Link} from "react-router-dom";
import '../css/sidebar.css'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className={`sidebar-toggle ${isOpen ? 'open' : 'closed'}`} onClick={toggleSidebar}>
                {isOpen ? '〈' : '〉'}
            </button>
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <h2><Link to="/" >Couple share</Link></h2>
                <ul>
                    <li><Link to="/" className="sidebar-list">Home</Link></li>
                    <li><Link to="/mypage" className="sidebar-list">My page</Link></li>
                    <li><Link to="/CoupleMatching" className="sidebar-list">Couple Matching</Link></li>
                    <li><Link to="/" className="sidebar-list">Home</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
