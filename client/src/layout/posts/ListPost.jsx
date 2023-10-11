import React, { useState } from 'react';
import PostItem from './PostItem';
import ScrollTrigger from 'react-scroll-trigger';
import PostItemSketeton from './PostItemSketeton';
function ListItem({ data = {}, isSingle }) {
    const [isVisible, setIsVisible] = useState(false);
    const onEnterViewport = () => {
        setIsVisible(true);
    };

    return (
        <ScrollTrigger onEnter={onEnterViewport}>
            <div className={`item h-full ${isVisible ? 'visible' : ''}`}>

            </div>
        </ScrollTrigger>
    );
}
const ListPost = ({ data = [] }) => {
    const arr = Array(6).fill(null)
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-5 col-span-2 mx-2 lg:mx-0'>
            {data.length > 0 ? data?.map((item) => (
                <PostItem key={item._id} data={item} isSingle ></PostItem>
            )) : arr.map((item, index) => (
                <PostItemSketeton key={index}></PostItemSketeton>
            ))
            }
        </div>
    );
};

export default ListPost;
{/* <PostItem image={"https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250230038502.jpg"} ></PostItem>
<PostItem image={"https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250230038502.jpg"} header={''}></PostItem>
<PostItem image={"https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250230038502.jpg"} ></PostItem>
<PostItem image={"https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250230038502.jpg"} ></PostItem>
<PostItem image={"https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250230038502.jpg"} ></PostItem>
<PostItem image={"https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250230038502.jpg"} ></PostItem>
<PostItem image={"https://cdn.tgdd.vn/Files/2022/01/25/1412805/cach-nau-pho-bo-nam-dinh-chuan-vi-thom-ngon-nhu-hang-quan-202201250230038502.jpg"} header={' Phở Việt Nam - 1 trong những món ăn hấp dẫn nhất hành tinh'}></PostItem> */}