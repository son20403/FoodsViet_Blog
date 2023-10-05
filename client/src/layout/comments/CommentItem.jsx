import React, { useEffect, useRef } from 'react';
import Avatar from '../customers/Avatar';
import { Heading } from '../../components/heading';
import IconWrap from '../../components/Icon/IconWrap';
import { ArrowNextIcon, CommentIcon, EditIcon, HeartIcon, TrashIcon } from '../../components/Icon';
import { Input } from '../../components/input';
import useClickOutSide from '../../hooks/useClickOutSide';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import useTimeSince from '../../hooks/useTimeSince';

const schemaValidateReply = Yup.object({
    comment: Yup.string().required("Vui lòng nhập bình luận!")
})
const CommentItem = ({ comment, replies = () => { }, countR = 0 }) => {

    // REPLY :)
    const { handleSubmit: handleSubmitReply, formState: { errors: errorsReply,
        isSubmitting: isSubmittingReply, isValid: isValidReply }, control: controlReply } =
        useForm({ resolver: yupResolver(schemaValidateReply), mode: 'onBlur', })
    const handleReply = (value) => {
        console.log("🚀 ~ file: CommentItem.jsx:20 ~ handleReply ~ value:", value)
    }

    // EDIT COMMENT
    const { handleSubmit: handleSubmitEditComment, formState: { errors: errorsEditComment,
        isSubmitting: isSubmittingEditComment, isValid: isValidEditComment }, control: controlEditComment } =
        useForm({ resolver: yupResolver(schemaValidateReply), mode: 'onBlur', })
    const handleEditComment = (value) => {
        console.log("🚀 ~ file: CommentItem.jsx:27 ~ handleEditComment ~ value:", value)
    }
    const timeSince = useTimeSince()
    const { customers } = useSelector((state) => state.customers);
    const customerByComment = customers.filter((cus) => cus._id === comment.id_customer)[0]
    console.log("🚀 ~ file: CommentItem.jsx:37 ~ CommentItem ~ customerByComment:", customerByComment)
    const countReply = countR + 1
    const listReplies = replies(comment.id);
    const { show: showReply, setShow: setShowReply, domRef: domReply } = useClickOutSide("#reply");
    const { show: showEdit, setShow: setShowEdit, domRef: domEdit } = useClickOutSide("#edit_comment");
    const handleShowReply = () => {
        setShowReply(!showReply)
        setShowEdit(false)
    }
    const handleShowEdit = () => {
        setShowEdit(!showEdit)
        setShowReply(false)
    }
    return (
        <div className='relative'>
            <div className='flex gap-x-3 lg:gap-x-5 items-start mt-5' >
                <Avatar className='!h-8 !w-8 lg:!h-10 lg:!w-10' image={customerByComment.image}></Avatar>
                <div className='mt-1 lg:mt-2 flex-1' >
                    <Heading className='text-sm md:text-base font-semibold'>{customerByComment?.full_name}</Heading>
                    <span className='text-[11px] text-text-gray font-medium '>
                        {timeSince(comment?.timestamps || Date.now())}</span>
                    <p className='text-xs md:text-sm my-2 mb-5  lg:my-4'>
                        {comment.content}</p>
                    <div ref={domReply}>
                        <div ref={domEdit}>
                            <div className='flex items-center gap-x-4 lg:gap-x-6 text-text-gray flex-wrap gap-y-5'>
                                <div onClick={handleShowReply}>
                                    <IconWrap className='cursor-pointer'><CommentIcon />
                                        <p className='text-[10px] md:text-xs'>
                                            Reply </p></IconWrap>
                                </div>
                                <div onClick={handleShowEdit}>
                                    <IconWrap className='cursor-pointer'><EditIcon />
                                        <p className='text-[10px] md:text-xs'>Edit</p></IconWrap>
                                </div>
                                <IconWrap><TrashIcon /> <p className='text-[10px] md:text-xs'>Delete</p></IconWrap>
                            </div>
                            {/* REPLY */}
                            <div className={`mt-5 lg:mb-10 w-full bg-white border py-3 px-2 
                                ${showReply ? 'block' : 'hidden'}`}>
                                <form onSubmit={handleSubmitReply(handleReply)} id='reply' autoComplete='off'
                                    className='flex items-center gap-x-4'>
                                    <div className='flex-1'>
                                        <Input name={'comment'} control={controlReply} errors={errorsReply} value=''
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

                            {/* EDIT COMMENT */}
                            <div className={`mt-5 lg:mb-10 w-full bg-white border py-3 px-2 
                                ${showEdit ? 'block' : 'hidden'}`}>
                                <form onSubmit={handleSubmitEditComment(handleEditComment)}
                                    id='edit_comment' autoComplete='off'
                                    className='flex items-center gap-x-4'>
                                    <div className='flex-1'>
                                        <Input name={'comment'} control={controlEditComment} errors={errorsEditComment}
                                            value='' type='text' placeholder='Sửa bình luận' >
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
                        </div></div>
                    {/* LIST COMMENT REPLY 1 lần */}
                    {listReplies?.length > 0 && countReply < 2 && listReplies.map(reply => (
                        <CommentItem key={reply.id} comment={reply} replies={replies}
                            countR={countReply}></CommentItem>
                    ))}
                </div>
            </div>
            {/* LIST COMMENT REPLY lần 2 trở lên */}
            {listReplies?.length > 0 && countReply > 1 && listReplies.map(reply => (
                <CommentItem key={reply.id} comment={reply} replies={replies} countR={countReply}></CommentItem>
            ))}
        </div>
    );
};

export default CommentItem;