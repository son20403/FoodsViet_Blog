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
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useKeyboardAvoidance from '../hooks/useKeyboardAvoidance';
import { SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';

const schemaValidate = Yup.object({
    // user_name: Yup.string().required("Vui lòng nhập tên đăng nhập!")
    //     .max(20, "Tên tài khoản không được dài quá 20 ký tự")
    //     .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
    // full_name: Yup.string().required("Vui lòng nhập họ và tên nhập!")
    //     .max(22, "Tên không dài quá 23 ký tự")
    //     .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
    // password: Yup.string()
    //     .required("Vui lòng nhập mật khẩu!")
    //     .min(6, 'Mật khẩu có ít nhất 8 ký tự!')
    //     .max(20, "Mật khẩu không được dài quá 20 ký tự")
    //     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //         'Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!'),
    // email: Yup.string().required("Vui lòng nhập email!").email("Vui lòng nhập đúng định dạng email!"),
})

const DetailPage = () => {
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', })
    const handleComment = (value) => {
    }

    const { slug } = useParams()
    const [dataDetailPost, setDataDetailPost] = useState({});

    const { posts, error } = useSelector((state) => state.posts);
    console.log("🚀 ~ file: DetailPage.jsx:47 ~ DetailPage ~ error:", error)
    const { comments } = useSelector((state) => state.comments);

    const detailPost = posts.filter((post) => post?.slug === slug);
    const postByCategories = posts.filter((post) => post?.category === dataDetailPost?.category);
    const commentByPosts = comments.filter((comment) => comment?.id_post === dataDetailPost?._id);
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
        <div className='page-content md:mt-5 mb-10'>
            <div className='px-2 lg:mx-0 '>
                <div className='border-b border-b-primary mb-10'>
                    <div className='flex gap-x-60 flex-col-reverse md:flex-row'>
                        <div className='flex flex-col gap-y-10 flex-1' >
                            <Heading className='lg:text-5xl text-3xl font-bold lg:leading-snug'>
                                {dataDetailPost?.title}
                            </Heading>
                        </div>
                        <div className='text-3xl mb-2 mt-5  flex justify-end'>
                            <HeartIcon />
                        </div>
                    </div>
                    <div className='flex  gap-x-5 md:gap-x-10 gap-y-3 items-center justify-between md:justify-normal 
                        !text-xs my-5 '>
                        <div className='flex gap-3 items-center'>
                            <Avatar></Avatar>
                            <h2 className='text-xs md:text-sm font-medium'>Nguyen Truong Son</h2>
                        </div>
                        <div>
                            <DataPost timestamps={dataDetailPost?.timestamps} comments={commentByPosts?.length} likes={dataDetailPost?.likes}></DataPost>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-10'>
                    <div className='col-span-3 lg:col-span-2 overflow-hidden'>
                        <div className='mb-10'>
                            <img src={dataDetailPost?.image} alt="" className='w-full max-h-[400px] object-cover 
                            rounded-lg' />
                        </div>
                        <div className='text-xs leading-6 md:text-sm lg:text-base'>
                            <div dangerouslySetInnerHTML={{ __html: dataDetailPost?.content }}
                                className='content_post !text-xs md' />
                        </div>
                    </div>
                    <div className='col-span-3 lg:col-span-1'>
                        <ListPostsSidebar data={postByCategories}></ListPostsSidebar>
                    </div>
                </div>
                <div className='mt-10'>
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
                                <Input name={'comment'} control={control} errors={errors} value=''
                                    type='text' placeholder='Nhập nội dung bình luận' >
                                    <CommentIcon></CommentIcon>
                                </Input>
                            </div>
                            <button type='submit' className='px-3 mx-2 py-3 border-2 border-opacity-60
                                rounded-xl border-primary'>
                                <IconWrap className='text-2xl text-primary'>
                                    <ArrowNextIcon></ArrowNextIcon>
                                </IconWrap>
                            </button>
                        </form>
                    </div>
                    <div className='my-5'>
                        {rootComment.length > 0 && rootComment.map(comment => (
                            <CommentItem key={comment._id} comment={comment} replies={getReplies}></CommentItem>
                        ))}
                        {rootComment.length < 1 && (<p>Chưa có bình luận nào!</p>)}
                    </div>
                </div>
                <div className='mt-20'>
                    <Heading isHeading className='mb-10 ml-0'>
                        Popular Category
                    </Heading>
                    <SlideWrap desktop={3} tablet={2} mobile={1} spaceBetween={10}>
                        {postByCustomer.length > 0 && postByCustomer.map(item => (
                            <SwiperSlide key={item._id}>
                                <PostItem data={item}></PostItem>
                            </SwiperSlide>
                        ))}
                    </SlideWrap>
                </div>
            </div>
        </div>
    );
};
export default DetailPage;