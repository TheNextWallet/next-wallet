import React from 'react';

const RemoveIcon = ({ color = '#A2A2A8' }) => {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.625 6.125H4.375" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.375 11.375V18.375" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.625 11.375V18.375" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21.875 6.125V22.75C21.875 22.9821 21.7828 23.2046 21.6187 23.3687C21.4546 23.5328 21.2321 23.625 21 23.625H7C6.76794 23.625 6.54538 23.5328 6.38128 23.3687C6.21719 23.2046 6.125 22.9821 6.125 22.75V6.125" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.375 6.125V4.375C18.375 3.91087 18.1906 3.46575 17.8624 3.13756C17.5342 2.80937 17.0891 2.625 16.625 2.625H11.375C10.9109 2.625 10.4658 2.80937 10.1376 3.13756C9.80937 3.46575 9.625 3.91087 9.625 4.375V6.125" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default RemoveIcon;
