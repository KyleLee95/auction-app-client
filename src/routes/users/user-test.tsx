import React, { useEffect, useState } from 'react';

interface User {
    // id: number;
    // name: string;
    // email: string;
    message: string;
}


function UserProfileTest() {
    const [user, setUser] = useState<User | null>(null);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             console.log("calling user");
    //             const response = await fetch('api/user/test', {
    //                 method: "GET"
    //             }
    //             );
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             const data: User = await response.json();
    //             setUser(data);
    //         } catch (error) {
    //             console.error("Fetch error:", error);
    //         }
    //     };

    //     fetchUser();
    // }, []);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("calling user");
                const response = await fetch('/api/user/test', {
                    method: "GET"
                });
                console.log(response)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const message = await response.text(); // Read response as plain text
                const user: User = { message }; // Map the string to the `message` property
                setUser(user);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            {/* <p><strong>Name:</strong> {user.name}</p> */}
            {/* <p><strong>Email:</strong> {user.email}</p> */}
            {<p><strong>Testing reception of api: {user.message}</strong></p>}
        </div>
    );
};

export { UserProfile };
