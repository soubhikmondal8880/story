import React, { createContext, useState, useEffect } from 'react';

// Create a Context with default values
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Initialize state from localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

        if (token && storedUser && storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Function to handle login
    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        setUser(userData);
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        setUser(null);
    };

    // Provide context values to children
    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
