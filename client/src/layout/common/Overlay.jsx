import React from 'react';

const Overlay = ({ onClick = () => { }, show }) => {
    return (
        <div onClick={onClick} className={`fixed inset-0 bg-black bg-opacity-25 z-[9] ${show ? '' : 'hidden'}`}></div>
    );
};

export default Overlay;