import React, { useEffect, useState } from 'react';
import { useAuthenticator } from "@aws-amplify/ui-react";

interface User {
    cognitoUserId: string;
    email: string;
    name: string;
    address: string;
    telephoneNumber: string;
}

interface Email {
    id: string;
    fromUsername: string;
    timestamp: string;
    message: string;
}

function AdminFunctionalities() {
    const [users, setUsers] = useState<User[]>([]);
    const [emails, setEmails] = useState<Email[]>([]);
    const [replyContent, setReplyContent] = useState('');
    const [selectedEmailId, setSelectedEmailId] = useState('');

    const { user } = useAuthenticator();
    const userId = user?.userId || ''; // Ensure userId is handled gracefully

    // Fetch all active users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/user/admin/userInfo');
                if (!response.ok) {
                    throw new Error(`Error fetching users: ${response.status}`);
                }
                const data: User[] = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    const fetchEmails = async () => {
        try {
            const response = await fetch('/api/user/admin/getMessages');
            if (!response.ok) {
                throw new Error(`Error fetching emails: ${response.status}`);
            }
            const data: Email[] = await response.json();
            setEmails(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch emails
    useEffect(() => {

        fetchEmails();
    }, []);

    // Suspend a user
    const handleSuspendUser = async (userId: string) => {
        try {
            const response = await fetch(`/api/user/admin/suspend/${userId}`, { method: 'PUT' });
            if (!response.ok) {
                throw new Error(`Error suspending user: ${response.status}`);
            }
            alert('User suspended successfully!');
            setUsers((prevUsers) => prevUsers.filter((user) => user.cognitoUserId !== userId));
        } catch (error) {
            console.error(error);
        }
    };

    // Grant admin privileges
    const handleGrantAdmin = async (userId: string) => {
        try {
            const response = await fetch(`/api/user/admin/privileges/${userId}`, { method: 'PUT' });
            if (!response.ok) {
                throw new Error(`Error granting admin privileges: ${response.status}`);
            }
            alert('Admin privileges granted successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    // Reply to an email
    const handleReplyToEmail = async () => {
        if (!selectedEmailId) {
            alert('Please select an email to reply to.');
            return;
        }
        try {
            const payload = {
                emailId: selectedEmailId,
                message: replyContent,
                fromAdmin: userId,
            };
            const response = await fetch('/api/user/admin/replyTo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error(`Error replying to email: ${response.status}`);
            }
            alert('Reply sent successfully!');
            setReplyContent('');
            setSelectedEmailId('');

            // Fetch updated list of emails
            await fetchEmails();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">
            <h1 className="text-2xl font-bold mb-4">Admin Functionalities</h1>

            {/* Users Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Active Users</h2>
                <div className="overflow-x-auto border border-gray-300 rounded-lg max-h-60">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-200 sticky top-0">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.cognitoUserId} className="border-t">
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => handleSuspendUser(user.cognitoUserId)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Suspend
                                        </button>
                                        <button
                                            onClick={() => handleGrantAdmin(user.cognitoUserId)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Grant Admin
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Emails Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Customer Emails</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {emails.map((email) => (
                        <div
                            key={email.id}
                            className={`p-4 border rounded-lg ${selectedEmailId === email.id ? 'bg-gray-200' : 'bg-white'
                                }`}
                            onClick={() => setSelectedEmailId(email.id)}
                        >
                            <p>
                                <strong>From:</strong> {email.fromUsername}
                            </p>
                            <p>{email.message}</p>
                        </div>
                    ))}
                </div>

                {/* Reply Section */}
                {selectedEmailId && (
                    <div className="mt-4">
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply here..."
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <button
                            onClick={handleReplyToEmail}
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Submit Reply
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export { AdminFunctionalities };
