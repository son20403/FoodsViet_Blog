import React from 'react';
import Overlay from './common/Overlay';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../sagas/auth/authSlice';
import { useDispatch } from 'react-redux';
import { closeSetting } from '../sagas/global/globalSlice';

const Setting = ({ show, onClick }) => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
        dispatch(closeSetting())
    }
    return (
        <>
            <Overlay show={show} onClick={onClick}></Overlay>
            <div className={`flex-1 absolute bg-white-cream flex top-full w-full justify-center gap-5 transition-all
                flex-col px-5 py-5 text-sm z-[10] right-0 shadow-soft border-t border-primary 
                md:max-w-[200px] lg:text-center
                ${show ? 'top-full' : 'invisible opacity-0'}`}>
                <Link to={'/info'}>Thông tin người dùng</Link>
                <Link to={'/add-post'}>Thêm bài viết</Link>
                <div>Nhắn tin</div>
                <hr />
                <div className='cursor-pointer text-red-500' onClick={handleLogout}>Đăng xuất</div>
            </div>
        </>
    );
};

export default Setting;