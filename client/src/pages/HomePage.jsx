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
            <Section className='page-content'>
                <Heading isHeading className='mb-10 mx-2 '>
                    Popular Category
                </Heading>
            </Section>
            <SlideSwiper></SlideSwiper>
            <div className='page-content '>
                <Section>
                    <Heading isHeading className='mb-10 mx-2'>
                        Popular Category
                    </Heading>
                    <ListSlide data={dataCategories}></ListSlide>
                </Section>
                <Section>
                    <Heading isHeading className='mb-10 mx-2'>
                        Super Delicious
                    </Heading>
                    <ListPostHome data={dataPosts?.slice(0, 10)} isHome></ListPostHome>
                </Section>
                <Section>
                    <Heading isHeading className='mb-10 mx-2'>
                        New Customer
                    </Heading>
                    <ListCustomer data={customers}></ListCustomer>
                </Section>
                <Section>
                    <Heading isHeading className='mb-10 mx-2'>
                        Super Delicious
                    </Heading>
                    <ListPost data={dataPosts?.slice(10)}></ListPost>
                </Section>
            </div>
        </div>
    );
};

export default HomePage;
