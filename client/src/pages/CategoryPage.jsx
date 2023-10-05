import React, { useEffect } from 'react';
import { Heading } from '../components/heading';
import ListSlide from '../layout/slide/ListSlide';
import ListCategory from '../layout/categories/ListCategory';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CategoryPage = () => {
    const { categories, error } = useSelector((state) => state.categories);
    // const [dataCategories, setDataCategories] = useState([]);
    useEffect(() => {
        if (error) toast.error(error.message)
    }, [error]);
    return (
        <div className='page-content min-h-screen'>
            <Heading isHeading className='my-10 mx-2'>Categories</Heading>
            <div className='mb-10'>
                <ListCategory data={categories}></ListCategory>
            </div>
        </div>
    );
};

export default CategoryPage;