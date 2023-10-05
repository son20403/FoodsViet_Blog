import React from 'react';
import { Heading } from '../components/heading';
import { InputSearch } from '../components/input';
import ListPost from '../layout/posts/ListPost';
import { useSelector } from 'react-redux';


const PostPage = () => {
    const { posts } = useSelector((state) => state.posts);

    return (
        <div className='page-content min-h-screen'>
            <Heading isHeading className='my-10 mx-2 '>Danh sách bài viết</Heading>
            <div className='mb-10'>
                <div className='mb-10 mx-2'>
                    <InputSearch></InputSearch>
                </div>
                <ListPost data={posts}></ListPost>
            </div>
        </div>
    );
};

export default PostPage;