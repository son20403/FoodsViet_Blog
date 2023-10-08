// MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { postsRequest } from '../sagas/posts/postsSlice';
import { categoriesRequest } from '../sagas/categories/categoriesSlice';
import { customersRequest } from '../sagas/customers/customersSlice';
import { commentsRequest, setNotify } from '../sagas/comments/commentsSlice';

function MainLayout() {
    const dispatch = useDispatch()
    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const { error } = useSelector((state) => state.posts);
    const tokenLocal = localStorage.getItem('authToken')
    useEffect(() => {
        dispatch(postsRequest(token || tokenLocal))
        dispatch(categoriesRequest(token || tokenLocal))
        dispatch(customersRequest(token || tokenLocal))
        dispatch(commentsRequest(token || tokenLocal))
        dispatch(setNotify())
    }, [token, dispatch, tokenLocal, location.pathname]);
    return (
        <div className='relative min-h-[1000px] max-w-[1600px] m-auto flex flex-col '>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default MainLayout;