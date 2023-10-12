import React, { useEffect, useRef, useState } from 'react';
import Heading from '../components/heading/Heading';
import Avatar from '../layout/customers/Avatar';
import { ArrowNextIcon, CommentIcon, HeartIcon } from '../components/Icon';
import ListPostsSidebar from '../layout/posts/ListPostsSidebar';
import SlideWrap from '../layout/slide/SlideWrap';
import PostItem from '../layout/posts/PostItem';
import DataPost from '../layout/posts/DataPost';
import CommentItem from '../layout/comments/CommentItem';
import { Input } from '../components/input';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import IconWrap from '../components/Icon/IconWrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';
import PageWrap from '../layout/common/PageWrap';
import { commentsRequest, postCommentsRequest } from '../sagas/comments/commentsSlice';
import { getDate, getTimestamp } from '../hooks/useGetTime';
import { ButtonComment } from '../components/button';

const schemaValidate = Yup.object({
    content: Yup.string().required("Vui lòng nhập nội dung!"),
})

const DetailPage = () => {
    const dispatch = useDispatch()
    const { posts, error } = useSelector((state) => state.posts);
    const { token } = useSelector((state) => state.auth);
    const { customers } = useSelector((state) => state.customers);
    const { categories } = useSelector((state) => state.categories);
    const { comments } = useSelector((state) => state.comments);
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control, reset } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', })
    const handleResetForm = () => {
        reset()
    }
    const handleComment = (value) => {
        if (isValid) {
            const date = getDate()
            const timestamps = getTimestamp()
            const comment = {
                ...value,
                id_post: dataDetailPost._id,
                date,
                timestamps
            }
            dispatch(postCommentsRequest({ token, comment }))
            handleResetForm()
            dispatch(commentsRequest(token))
        } else {
            toast.error('Nhập nội dung trước khi bình luận')
        }
    }

    const { slug } = useParams()
    const [dataDetailPost, setDataDetailPost] = useState({});

    const detailPost = posts.filter((post) => post?.slug === slug);
    const dataCategory = categories.filter((cate) => cate._id === dataDetailPost?.category)[0]
    const postByCategories = posts.filter((post) => post?.category === dataDetailPost?.category)
        .filter((post) => post?.slug !== slug);
    const commentByPosts = comments.filter((comment) => comment?.id_post === dataDetailPost?._id).reverse();
    const customerByPosts = customers.filter((customer) => customer?._id === dataDetailPost?.id_customer)[0];
    const postByCustomer = posts.filter((post) => post?.id_customer === dataDetailPost?.id_customer);

    const rootComment = commentByPosts?.filter(comment => comment?.parent_comment_id === '')
    const getReplies = (commentId) => {
        return commentByPosts?.filter(commentByPost => commentByPost?.parent_comment_id === commentId)
    }
    useEffect(() => {
        setDataDetailPost(detailPost[0])
    }, [comments, detailPost, slug]);
    useEffect(() => {
        if (error) toast.error(error.message)
    }, [error]);
    return (
        <>
            <div className='w-full lg:max-h-[500px] h-auto overflow-hidden relative min-h-[100px] md:min-h-[300px] lg:min-h-[500px]'>
                <img src={dataDetailPost?.image} alt="" className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-black bg-opacity-80'>
                    <div className='page-content px-5 mt-3 lg:px-10 flex flex-col h-full text-white flex-1 
                        justify-center items-center' >
                        <Heading isHeading className='lg:text-5xl md:text-3xl text-2xl font-normal text-center md:text-start 
                        lg:leading-normal leading-normal'>
                            {dataDetailPost?.title}
                        </Heading>
                        <div className='text-white text-xs md:text-sm lg:text-base uppercase opacity-80  mt-10 flex '>
                            <div className='px-2 border-r last:border-none'>{customerByPosts?.full_name}</div>
                            <div className='px-2 border-r last:border-none'>{dataDetailPost?.date} </div>
                            <div className='px-2 border-r last:border-none'>{dataCategory?.title}</div></div>
                    </div>
                </div>
            </div>
            <div className='page-content md:mt-5 mb-10'>
                <div className='px-2 lg:mx-0 '>
                    <div className='border-b border-b-primary mb-10'>
                        <div className='flex  gap-x-5 md:gap-x-10 gap-y-3 items-center justify-between md:justify-normal
                            !text-xs my-5 '>
                            <div className='flex gap-3 items-center'>
                                <Avatar image={customerByPosts?.image}></Avatar>
                                <h2 className='text-xs md:text-sm font-medium'>{customerByPosts?.full_name}</h2>
                            </div>
                            <div>
                                <DataPost timestamps={dataDetailPost?.timestamps}
                                    comments={commentByPosts?.length} likes={dataDetailPost?.likes}></DataPost>
                            </div>
                            <div className='text-3xl ml-auto  flex justify-end'>
                                <HeartIcon />
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-10'>
                        <div className='col-span-3 lg:col-span-3 overflow-hidden'>
                            <div className='mb-10 w-full max-w-[800px] m-auto'>
                                <img src={dataDetailPost?.image} alt="" className='w-full max-h-[400px] object-cover
                                rounded-lg' />
                            </div>
                            <div className='text-xs leading-6 md:text-sm lg:text-base'>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailPost?.content }}
                                    className='content_post !text-xs md' />
                            </div>
                        </div>
                    </div>
                    <div className='mt-10 '>
                        <div className='pb-5 flex items-end gap-x-5'>
                            <Heading isHeading className='ml-0'>
                                Bình luận
                            </Heading>
                            <span>({commentByPosts?.length})</span>
                        </div>
                        <div className='mt-5 lg:mb-10 w-full bg-white border py-3 px-2'>
                            <form onSubmit={handleSubmit(handleComment)} autoComplete='off'
                                className='flex items-center gap-x-4'>
                                <div className='flex-1'>
                                    <Input name={'content'} control={control} errors={errors} value=''
                                        type='text' placeholder='Nhập nội dung bình luận' >
                                        <CommentIcon></CommentIcon>
                                    </Input>
                                </div>
                                <ButtonComment isLoading={isSubmitting} />
                            </form>
                        </div>
                        <div className='my-5'>
                            {rootComment.length > 0 && rootComment.map(comment => (
                                <CommentItem key={comment._id} comment={comment} replies={getReplies}
                                    id_post={dataDetailPost._id}></CommentItem>
                            ))}
                            {rootComment.length < 1 && (<p className='text-sm text-center'>Chưa có bình luận nào!</p>)}
                        </div>
                    </div>
                    <div className='my-20'>
                        <Heading isHeading className='mb-10 ml-0 text-center'>
                            - Bài viết liên quan -
                        </Heading>
                        <ListPostsSidebar data={postByCategories}></ListPostsSidebar>
                    </div>
                    <div className='mt-20'>
                        <Heading isHeading className='mb-10 ml-0 text-center'>
                            - Bài viết khác của tác giả -
                        </Heading>
                        <SlideWrap desktop={3} tablet={2} mobile={1} spaceBetween={10}>
                            {postByCustomer.length > 0 && postByCustomer.map(item => (
                                <SwiperSlide key={item._id}>
                                    <PostItem isSingle data={item}></PostItem>
                                </SwiperSlide>
                            ))}
                        </SlideWrap>
                    </div>
                </div>
            </div>
        </>
    );
};
export default DetailPage;

{/* <div className='flex gap-x-60 flex-col-reverse md:flex-row'>
                            <div className='flex flex-col gap-y-10 flex-1' >
                                <Heading className='lg:text-5xl text-3xl font-bold lg:leading-snug'>
                                    {dataDetailPost?.title}
                                </Heading>
                            </div>
                            <div className='text-3xl mb-2 mt-5  flex justify-end'>
                                <HeartIcon />
                            </div>
                        </div> */}