import React, { useEffect, useState } from 'react';
import { InputSearch } from '../components/input';
import ListPost from '../layout/posts/ListPost';
import { useDispatch, useSelector } from 'react-redux';
import BannerCommon from '../layout/common/BannerCommon';
import _ from 'lodash';
import { searchPostsRequest } from '../sagas/posts/postsSlice';
import { useLocation } from 'react-router-dom';


const PostPage = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Lấy tham số dựa trên tên
    const key = searchParams.get("query") || '';
    const { search_posts, loading } = useSelector((state) => state.posts)
    const { token } = useSelector((state) => state.auth)
    const [query, setQuery] = useState(key);
    const handleOnChange = _.debounce((e) => {
        setQuery(e.target.value)
    }, 1000)
    useEffect(() => {
        dispatch(searchPostsRequest({ token, query }))
    }, [query]);
    return (
        <>
            <BannerCommon image={'./src/assets/image/banner-post.jpg'} title='Bài viết tìm kiếm' />
            <div className='page-content'>
                <div className='my-10'>
                    <div className='mb-10 mx-2'>
                        <InputSearch onChange={handleOnChange}></InputSearch>
                    </div>
                    <ListPost message={'Không có dữ liệu!'} data={search_posts}></ListPost>
                </div>
            </div>
        </>
    );
};

export default PostPage;