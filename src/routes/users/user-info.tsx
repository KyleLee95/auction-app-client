import React, { useEffect, useState } from 'react';
import { useAuthenticator } from "@aws-amplify/ui-react";

interface UserProfileData {
    cognitoUserId: string;
    email: string;
    name: string;
    address: string;
    telephoneNumber: string;
}

function UserProfile() {
    const [userProfile, setUserProfile] = useState<UserProfileData>({
        cognitoUserId: '',
        email: '',
        name: '',
        address: '',
        telephoneNumber: '',
    });

    const [message, setMessage] = useState(''); // State for the customer support message

    const { user } = useAuthenticator();
    const userId = user?.userId || ''; // Ensure userId is handled gracefully

    // Fetch user data from API on component load
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/user/userInfo/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data: UserProfileData = await response.json();

                // Ensure null or undefined values are replaced with empty strings
                setUserProfile({
                    cognitoUserId: data.cognitoUserId || '',
                    email: data.email || '',
                    name: data.name || '',
                    address: data.address || '',
                    telephoneNumber: data.telephoneNumber || '',
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (userId) fetchUserData(); //It looks like this one is being called twice
    }, [userId]);

    // Handle input changes for editable fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    // Submit updated user information
    const handleSubmitProfile = async () => {
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

    // Handle message submission
    const handleSubmitMessage = async () => {
        try {
            const payload = {
                fromUsername: userId,
                message,
            };

            const response = await fetch('/api/user/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            alert('Message sent to admin successfully!');
            setMessage(''); // Clear the message box after successful submission
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-8">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <form>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="cognitoUserId" className="block font-medium text-gray-700">
                            Cognito User ID (Read-only):
                        </label>
                        <input
                            type="text"
                            id="cognitoUserId"
                            name="cognitoUserId"
                            value={userProfile.cognitoUserId}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userProfile.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-700">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userProfile.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block font-medium text-gray-700">
                            Address:
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={userProfile.address}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="telephoneNumber" className="block font-medium text-gray-700">
                            Telephone Number:
                        </label>
                        <input
                            type="tel"
                            id="telephoneNumber"
                            name="telephoneNumber"
                            value={userProfile.telephoneNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleSubmitProfile}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Customer Support</h2>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message to admin..."
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={handleSubmitMessage}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    Submit Message
                </button>
            </div>
        </div>
    );
}

export { UserProfile };
