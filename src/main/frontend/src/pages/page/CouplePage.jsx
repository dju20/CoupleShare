// src/components/CouplePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CoupleProfile from "../component/CoupleProfile";
import apiClient from "../../utils/apiClient";

const CouplePage = () => {
    const { coupleId } = useParams();
    const [coupleData, setCoupleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoupleData = async () => {
            try {
                const response = await apiClient.get(`/couple/page/${coupleId}`);
                setCoupleData(response.data);
            } catch (err) {
                setError('Failed to fetch couple data');
            } finally {
                setLoading(false);
            }
        };

        fetchCoupleData();
    }, [coupleId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {coupleData && (
                <div>
                    <CoupleProfile coupleData={coupleData} />
                    {coupleData.canEdit && (
                        <button onClick={() => {/* 수정 로직 */}}>
                            Edit Couple Page
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CouplePage;
