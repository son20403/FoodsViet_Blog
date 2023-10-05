import React from 'react';
import { Spinner } from "@material-tailwind/react";
const Button = ({ children, className = '', type = 'button', isLoading = false }) => {
    const child = isLoading ? <Spinner color='cyan' /> : children
    return (
        <button type={type} disabled={isLoading} className={`px-5 md:px-10 py-2 min-h-[42px] border text-center text-xs md:text-sm flex justify-center items-center rounded-[4px] bg-primary text-white ${className} disabled:opacity-50`}>
            {child}
        </button>
    );
};

export default Button;