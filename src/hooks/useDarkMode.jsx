import React, { useEffect, useState } from 'react';

export const useDarkMode = () => {
    const [isDark, setIsDark] = useState(() => {
        // Check local storage for user preference
        if (localStorage.getItem('theme')) {
            return localStorage.getItem('theme') === 'dark';
        };

        // If no preference, use system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() =>{
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return [isDark, setIsDark];
};