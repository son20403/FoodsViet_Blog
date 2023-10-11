import React from 'react';

const Banner = () => {
    return (
        <div className='w-full h-full relative '>
            <div className='absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center'>
                <div className='flex flex-col items-center text-white gap-y-5 md:gap-y-10 lg:gap-y-20 '>
                    <h1 className='text-2xl md:text-7xl lg:text-8xl font-bold font-logo '>FOODSVIET</h1>
                    <p className='text-xl md:text-5xl lg:text-6xl'
                        style={{ fontFamily: `Dancing Script, cursive` }}>
                        Ẩm Thực Việt - Trải Nghiệm Việt</p>
                    <span className='text-xs md:text-base lg:text-xl'>@FoodsViet</span>
                </div>
            </div>
            <img src="./src/assets/image/banner-home.jpg" alt="" />
        </div>
    );
};

export default Banner;