import React from 'react';

const Heading = ({ children, className = '', isHeading }) => {
    return (
        <h1 className={`font-heading text-2xl ${className} 
            ${isHeading ? 'font-bold text-base md:text-2xl border-l-4 border-l-primary pl-5 lg:mx-0' : ''}`}>
            {children}
        </h1>
    );
};

export default Heading;