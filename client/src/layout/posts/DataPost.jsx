import React from 'react';
import IconWrap from '../../components/Icon/IconWrap';
import { CalendarIcon, CommentIcon, HeartIcon } from '../../components/Icon';
import useTimeSince from '../../hooks/useTimeSince';

const DataPost = ({ timestamps = 0, comments = 0, likes = [] }) => {
    const timeSince = useTimeSince()
    const countLikes = likes?.length || 0
    return (
        <div className='post_item-icon w-full mt-auto flex-wrap p-3  text-text-gray flex gap-2 lg:gap-5 justify-end 
        text-[12px] lg:text-base'>
            <IconWrap><CalendarIcon /><p className="text-[11px] lg:text-xs">
                {timeSince(timestamps || Date.now())}</p></IconWrap>
            <IconWrap><CommentIcon /> <p className="text-[11px] lg:text-xs">{comments}</p></IconWrap>
            <IconWrap><HeartIcon /> <p className="text-[11px] lg:text-xs">{countLikes}</p></IconWrap>
        </div>
    );
};

export default DataPost;