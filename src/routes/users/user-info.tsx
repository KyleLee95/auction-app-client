import React, { useEffect, useState } from 'react';
import { useAuthenticator } from "@aws-amplify/ui-react";
interface UserProfileData {
    cognitoUserId: string;
    email: string;
    name: string;
    address: string;
    telephoneNumber: string;
    // status: string;
}

function UserProfile() {
    const [userProfile, setUserProfile] = useState<UserProfileData>({
        cognitoUserId: '',
        email: '',
        name: '',
        address: '',
        telephoneNumber: '',
        // status: '',
    });
    const { user } = useAuthenticator();
    const userId = user.userId

    // Fetch user data from API on component load
    useEffect(() => {
        const fetchUserData = async () => {

            try {
                const response = await fetch(`/api/user/userInfo/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data: UserProfileData = await response.json();
                // Handle null values and set them to empty string
                setUserProfile({
                    cognitoUserId: data.cognitoUserId ?? '',
                    email: data.email ?? '',
                    name: data.name ?? '',
                    address: data.address ?? '',
                    telephoneNumber: data.telephoneNumber ?? '',
                    // status: data.status ?? '',
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserData();
    }, []);

    // Handle input changes for editable fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // Submit updated user information
    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/user/userInfo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userProfile),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">User Profile</h1>
            <form className="space-y-6">
                {/* Cognito User ID (Read-only) */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="cognitoUserId" className="w-1/4 text-lg font-medium text-gray-700">Cognito User ID:</label>
                    <input
                        type="text"
                        id="cognitoUserId"
                        name="cognitoUserId"
                        value={userProfile.cognitoUserId}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:border-gray-400"
                    />
                </div>
                {/* Email */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="email" className="w-1/4 text-lg font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userProfile.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Name */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="name" className="w-1/4 text-lg font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userProfile.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Address */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="address" className="w-1/4 text-lg font-medium text-gray-700">Address:</label>
                    <textarea
                        id="address"
                        name="address"
                        value={userProfile.address}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Telephone Number */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="telephoneNumber" className="w-1/4 text-lg font-medium text-gray-700">Telephone Number:</label>
                    <input
                        type="tel"
                        id="telephoneNumber"
                        name="telephoneNumber"
                        value={userProfile.telephoneNumber}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Status */}
                {/* <div className="flex items-center space-x-4">
                    <label htmlFor="status" className="w-1/4 text-lg font-medium text-gray-700">Status:</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={userProfile.status}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}
                {/* Save Button */}
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-1/3 bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export { UserProfile };
