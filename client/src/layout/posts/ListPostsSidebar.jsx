import React from 'react';
import { Heading } from '../../components/heading';
import PostItemSidebar from './PostItemSidebar';
import PostItemSidebarSleleton from './PostItemSidebarSkeleton';

const ListPostsSidebar = ({ data = [] }) => {
    const arr = Array(5).fill(null)
    return (
        <div className='col-span-1 md:col-span-3 lg:col-span-1'>
            <Heading isHeading className='mb-10 ml-0'>
                Popular Category
            </Heading>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-1'>
                {
                    data.length > 0 ? data.map(item => (
                        <PostItemSidebar key={item._id} data={item}></PostItemSidebar>
                    )) :
                        arr.map((item, index) => (
                            <PostItemSidebarSleleton key={index}></PostItemSidebarSleleton>
                        ))
                }
            </div>
        </div>
    );
};

export default ListPostsSidebar;