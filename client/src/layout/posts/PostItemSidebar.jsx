import React from 'react';
import { Heading } from '../../components/heading';
import { Link } from 'react-router-dom';

const PostItemSidebar = ({ data = {} }) => {
    return (
        <Link to={`/detail/${data?.slug}`} className=' flex gap-5 items-center border rounded-sm shadow-soft pr-2 overflow-hidden'>
            <div className='w-24 h-24 overflow-hidden'>
                <img src={data.image}
                    alt="" className=' w-full h-full object-cover' />
            </div>
            <div className='flex-1'>
                <Heading className='text-[13px] md:text-sm font-medium'>{data.title}</Heading>
            </div>
        </Link>
    );
};

export default PostItemSidebar;