import React, { useEffect, useState } from 'react';
import { UserContext } from './UserContext';

const UserProvider = ({ children }) => {
        const [ user, setUser] = useState(null);
        const [ isLoading, setIsLoading] = useState(true);

    // Load user data from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));

            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                localStorage.removeItem('user'); // Clear invalid usar data
                localStorage.removeItem('token'); // Clear invalid token
            };
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        };
        
        setIsLoading(false);

    },[]);

    // Function to update user data
    const updateUser = (userData, token) => {
        setUser(userData);

        if (userData && token) {
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);
        }
    };

    // Function to clear user data
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ 
            user, 
            updateUser, 
            clearUser,
            isLoading
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;