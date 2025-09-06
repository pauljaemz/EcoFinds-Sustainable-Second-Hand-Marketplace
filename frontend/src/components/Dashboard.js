import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api'; // Assuming you have an API function to fetch user profile

const Dashboard = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profileData = await getUserProfile();
                setUserProfile(profileData);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userProfile) {
        return <div>No user profile found.</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome, {userProfile.username}</h2>
            <div>
                <h3>Profile Information</h3>
                <p>Email: {userProfile.email}</p>
                <p>Role: {userProfile.role}</p>
                {/* Add more profile fields as necessary */}
            </div>
            {/* Add functionality for profile updates here */}
        </div>
    );
};

export default Dashboard;