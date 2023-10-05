import React, { useEffect, useState } from 'react';
import Logo from '../components/logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import useToggle from '../hooks/useToggle';
import Setting from './Setting';
import Search from './Search';
import Avatar from './customers/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNavbar, toggleSearch, toggleSetting, closeNavbar, closeSearch, closeSetting } from '../sagas/global/globalSlice';
import { useLocation } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch()
    const { showSearch, showSetting, showNavbar } = useSelector((state) => state.global)
    const handleShowNavbar = () => {
        dispatch(toggleNavbar())
    }
    const handleShowSearch = () => {
        dispatch(toggleSearch())
    }
    const handleShowSetting = () => {
        dispatch(toggleSetting())
    }
    const location = useLocation();

    useEffect(() => {
        dispatch(closeNavbar())
        dispatch(closeSearch())
        dispatch(closeSetting())
    }, [location.pathname, dispatch]);
    return (
        <div className='border-b border-b-primary md:border-b-0'>
            <Search showSearch={showSearch} handleShowSearch={handleShowSearch}></Search>
            <div className='page-content relative px-5 md:px-3 lg:px-2 flex items-center py-5 justify-between'>
                <div className=''>
                    <Logo></Logo>
                </div>
                <Navbar handleShowNavbar={handleShowNavbar} showNavbar={showNavbar}></Navbar>
                <Setting show={showSetting} onClick={handleShowSetting}></Setting>
                <div className='flex items-center gap-7 md:gap-10'>
                    <span className='text-xl font-thin' onClick={handleShowSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <Avatar onClick={handleShowSetting}></Avatar>
                    <div className='md:hidden' onClick={handleShowNavbar}>
                        <FontAwesomeIcon className={`${showNavbar ? 'text-2xl' : 'text-xl'}`}
                            icon={showNavbar ? faXmark : faBars} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;