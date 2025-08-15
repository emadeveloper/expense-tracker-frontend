import React, { useEffect, useState } from 'react';
import { UserContext } from './UserContext';

const UserProvider = ({ children }) => {
        const [ user, setUser] = useState(null);
        const [ isLoading, setIsLoading] = useState(true);

    // Load user data from localStorage on initial render
    useEffect(() => {
        console.log('UserProvider useEffect - checking localStorage for user data');

        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        console.log('📦 storedUser desde localStorage:', storedUser);
        console.log('🔑 storedToken desde localStorage:', storedToken);

        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));

                console.log('✅ Usuario parseado correctamente:', storedUser);

            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                localStorage.removeItem('user'); // Clear invalid usar data
                localStorage.removeItem('token'); // Clear invalid token
            }
        } else {
            console.log('⚠️ No hay usuario o token en localStorage');
        }

        console.log('🏁 UserProvider terminó de cargar, setting isLoading to false');
        setIsLoading(false);

    },[]);

     // Debug: mostrar cambios en el estado user
     useEffect(() => {
        console.log('🔄 UserProvider - user cambió a:', user);
        console.log('🔄 UserProvider - isLoading:', isLoading);
    }, [user, isLoading]);

    // Function to update user data
    const updateUser = (userData, token) => {
        console.log('🔧 updateUser llamado con:', userData, token);
        setUser(userData);

        if (userData && token) {
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);

            console.log('💾 Usuario y token guardados en localStorage');
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