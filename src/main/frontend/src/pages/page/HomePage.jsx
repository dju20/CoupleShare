import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import Header from "./header";
import MainBox from "../component/mainbox";
import "../css/HomePage.css";
import "../css/mainbox.css";

const HomePage = () => {
    const [isVisible, setIsVisible] = useState([false, false, false]);
    const boxRefs = useRef([]);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.9 // 10% 이상 보이면 트리거
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = boxRefs.current.indexOf(entry.target);
                    if (index !== -1) {
                        setIsVisible((prev) => {
                            const newVisible = [...prev];
                            newVisible[index] = true;
                            return newVisible;
                        });
                    }
                }
            });
        }, observerOptions);

        boxRefs.current.forEach((box) => {
            if (box) observer.observe(box);
        });

        return () => {
            boxRefs.current.forEach((box) => {
                if (box) observer.unobserve(box);
            });
        };
    }, []);

    return (

        <div className="Homepage">
            <Header />

            <div className="Homepage_Mainimage">
                <p>COUPLE SHARE</p>
            </div>
            <div className="Homepage_flex">
                <div ref={(el) => (boxRefs.current[0] = el)} className="Homepage_mainbox">
                    <MainBox title="Couple Matching" name="Go to match" link="/CoupleMatching"
                             className={isVisible[0] ? 'visible' : ''}/>
                    <span>hi hello</span>
                </div>
                <div ref={(el) => (boxRefs.current[1] = el)} className="Homepage_mainbox">
                    <MainBox title="status" name="Go to status" link="/" className={isVisible[1] ? 'visible' : ''}/>
                </div>
                <div ref={(el) => (boxRefs.current[2] = el)} className="Homepage_mainbox">
                    <MainBox title="Mypage" name="Go to mypage" link="/mypage"
                             className={isVisible[2] ? 'visible' : ''}/>
                </div>

            </div>


            <div className="Homepage_introduce">
                <p>Make Your Own CouplePage</p>
                <button className="Couplepage_createbutton"><Link to="/">Create CouplePage</Link></button>
            </div>
        </div>
    );
};

export default HomePage;
