import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Heading } from '../components/heading';
import { InputSearch } from '../components/input';
import Overlay from './common/Overlay';

const Search = ({ showSearch, handleShowSearch }) => {
    return (
        <>
            <Overlay show={showSearch} onClick={handleShowSearch}></Overlay>
            <div className={`flex-1 absolute bg-white-cream bg-opacity-50 flex w-full justify-center gap-5 transition-all backdrop-blur
                left-0 flex-col px-5 py-5 text-sm z-[12] shadow-soft border-t border-primary bad
                ${showSearch ? 'top-0' : 'invisible -top-[500px]'}`}
            >
                <div className='absolute top-2 right-2 text-2xl text-primary cursor-pointer' onClick={handleShowSearch}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className='page-content'>
                    <InputSearch></InputSearch>
                    <div className='flex flex-col'>
                        <SearchItem></SearchItem>
                        <SearchItem></SearchItem>
                        <SearchItem></SearchItem>
                        <SearchItem></SearchItem>
                    </div>
                </div>
            </div>
        </>
    );
};
const SearchItem = () => {
    return (
        <div className='flex gap-3 items-center border-b py-5 last:border-b-0'>
            <div className=' w-14 h-14 overflow-hidden rounded-md'>
                <img src="https://cdnimg.vietnamplus.vn/uploaded/ngtmbh/2019_12_19/battongnucuoicuabanvoicachlamtrangrangbangcacnguyenlieudongiantrangrangbangnuocgao021537172872880width600height450.jpg" alt=""
                    className='w-full h-full object-cover' />
            </div>
            <div className='flex-1'>
                <Heading className='text-sm'>
                    Phở Việt Nam - 1 trong những món ăn hấp dẫn nhất hành tinh</Heading>
            </div>
        </div>
    )
}

export default Search;