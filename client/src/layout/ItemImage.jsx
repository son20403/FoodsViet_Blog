import React from 'react';
import { Heading } from '../components/heading';

const ItemImage = ({ data, className = '' }) => {
    return (
        <div>
            <div className={`flex flex-col justify-center items-center gap-y-2 ${className}`}>
                <div className={`w-[100px] h-[100px]  md:w-[150px] md:h-[150px] rounded-full overflow-hidden`}>
                    <img src={data?.image} alt=""
                        className='w-full h-full object-cover' />
                </div>
                <Heading className='text-center text-sm md:text-base font-semibold'>
                    {data?.title || data?.full_name || ''}</Heading>
            </div>
        </div>
    );
};

export default ItemImage;