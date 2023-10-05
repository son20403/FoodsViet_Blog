import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to={'/'}>
            <span className='font-logo text-2xl md:text-3xl text-primary'>FOODSVIET</span>
        </Link>
    );
};

export default Logo;