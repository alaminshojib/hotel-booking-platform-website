import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import './Root.css'; // Assuming you have your global styles defined in Root.css
import Footer from "../footer/Footer";
import Navbar from "../Navbar/Navbar";

function Root() {
    // Initialize the theme preference based on localStorage or default to light mode
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');

    // Update localStorage whenever the theme preference changes
    useEffect(() => {
        localStorage.setItem('isDarkMode', isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={isDarkMode ? 'dark' : 'light' }>
            <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode}></Navbar>
            <div><Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
}

export default Root;
