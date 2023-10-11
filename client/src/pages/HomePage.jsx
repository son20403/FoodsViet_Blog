import React, { useEffect, useState } from 'react';
import Section from '../layout/common/Section';
import { Heading } from '../components/heading';
import ListSlide from '../layout/slide/ListSlide';
import ListCustomer from '../layout/customers/ListCustomer';
import ListPostHome from '../layout/posts/ListPostHome';
import ListPost from '../layout/posts/ListPost';
import { useSelector } from 'react-redux';
import SlideSwiper from '../layout/slide/SlideSwiper';
import { toast } from 'react-toastify';
import Banner from '../layout/Banner';
import Overlay from '../layout/common/Overlay';

const HomePage = () => {
    const { posts, error } = useSelector((state) => state.posts)
    const [dataPosts, setDataPosts] = useState([]);
    const { categories } = useSelector((state) => state.categories);
    const { customers } = useSelector((state) => state.customers);
    const [dataCategories, setDataCategories] = useState([]);
    useEffect(() => {
        setDataPosts(posts)
        setDataCategories(categories)
    }, [posts, categories]);
    useEffect(() => {
        if (error) toast.error(error.message)
    }, [error]);
    return (
        <div>
            <Section className='mb-10'>
                <Banner></Banner>
            </Section>
            {/* <SlideSwiper></SlideSwiper> */}
            <Heading isHeading className='mb-10 mx-2 text-center'>
                - Danh mục  -
            </Heading>
            <Section>
                <div className='w-full h-auto bg-[#f7f7f7] p-2 md:p-10 bg-cover relative'
                    style={{ backgroundImage: 'url(./src/assets/image/banner4.jpg)' }}>
                    <div className='bg-black opacity-80 inset-0 absolute'></div>
                    <div className='page-content my-20'>
                        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 '>
                            {dataCategories.length > 0 && dataCategories.slice(0, 4).map(item => (
                                <div key={item._id} className='h-[300px] md:h-[394px] bg-black relative rounded-2xl'>
                                    <img src={item?.image} alt="" className='w-full h-full object-cover rounded-2xl' />
                                    <div className='absolute bottom-0 translate-y-1/2 w-auto min-w-[80%]  
                                    rounded-2xl px-2 py-1 left-1/2 -translate-x-2/4 bg-primary text-white
                                    font-medium text-center text-xs md:text-base'>{item?.title}</div>
                                </div>
                            ))}
                        </div>
                        <Section>
                            <ListSlide className={'text-white'} data={dataCategories.slice(3)}></ListSlide>
                        </Section>
                    </div>
                </div>
            </Section>
            <div className='lg:px-2'>
                <Heading isHeading className='mb-10 mx-2 text-center'>
                    - Bài viết mới nhất -
                </Heading>
                <Section className='page-content '>
                    <ListPostHome data={dataPosts?.slice(0, 10)} isHome></ListPostHome>
                </Section>
                <Heading isHeading className='mb-10 mx-2 text-center'>
                    - Người dùng nỗi bật -
                </Heading>
                <Section className='bg-[#f7f7f7] py-10'>
                    <ListCustomer data={customers}></ListCustomer>
                </Section>
                <Section className='page-content '>
                    <Heading isHeading className='mb-10 mx-2 text-center'>
                        - Bài viết -
                    </Heading>
                    <ListPost data={dataPosts?.slice(10)}></ListPost>
                </Section>
            </div>
        </div>
    );
};

export default HomePage;
