// src/components/CoupleProfile.jsx
import React from 'react';

const CoupleProfile = ({ coupleData }) => {
    return (
        <div>
            <h2>Couple Page</h2>
            <div>
                <h3>Couple ID: {coupleData.coupleId}</h3>
                <p>User 1: {coupleData.user1Username}</p>
                <p>User 2: {coupleData.user2Username}</p>
                <p>Status: {coupleData.coupleStatus}</p>
            </div>
        </div>
    );
};

export default CoupleProfile;
