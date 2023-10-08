import React from 'react';
import { Heading } from '../components/heading';
import { InputSearch } from '../components/input';
import ListPost from '../layout/posts/ListPost';
import { useSelector } from 'react-redux';
import SlideSwiper from '../layout/slide/SlideSwiper';
import PageWrap from '../layout/common/PageWrap';


const PostPage = () => {
    const { posts } = useSelector((state) => state.posts);

    return (
        <PageWrap>
            <div className='page-content'>
                <Heading isHeading className='my-10 mx-2 '>Bài viết mới nhất</Heading>
            </div>
            <SlideSwiper></SlideSwiper>
            <div className='page-content min-h-screen'>
                <Heading isHeading className='my-10 mx-2 '>Danh sách bài viết</Heading>
                <div className='mb-10'>
                    <div className='mb-10 mx-2'>
                        <InputSearch></InputSearch>
                    </div>
                    <ListPost data={posts}></ListPost>
                </div>
            </div>
        </PageWrap>
    );
};

export default PostPage;