import React, { useEffect, useState } from 'react';
import { Heading } from '../components/heading';
import { Button } from '../components/button';
import Avatar from '../layout/customers/Avatar';
import { AtIcon, CommentIcon, EmailIcon, LocationIcon, LockIcon, UserIcon } from '../components/Icon';
import { Input } from '../components/input';
import { Field } from '../components/field';
import InputPassword from '../components/input/InputPassword';
import ListPost from '../layout/posts/ListPost';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
import PageWrap from '../layout/common/PageWrap';
import BannerCommon from '../layout/common/BannerCommon';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFound404 from './not-found/NotFound404';
import Overlay from '../layout/common/Overlay';

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

const InfoUser = () => {
    const { slug } = useParams()
    const navigate = useNavigate();
    const { customers } = useSelector((state) => state.customers);
    const { posts, loading } = useSelector((state) => state.posts);
    const { infoAuth } = useSelector((state) => state.auth);
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', })
    const handleEditUser = (value) => {
    }
    const dataCustomer = customers.filter((cus) => cus.slug === slug)[0]
    const dataPostsByCustomer = posts.filter((post) => post.id_customer === dataCustomer?._id) || [1]
    const isAuth = dataCustomer?._id === infoAuth?._id
    const [dataCus, setdataCus] = useState();
    useEffect(() => {
        setdataCus(dataCustomer)
    }, [dataCustomer]);
    if (!dataCus) {
        return (
            <><NotFound404></NotFound404></>
        )
    }
    return (
        <div className='bg-gray-50 relative'>
            <div className='w-full h-auto flex flex-col gap-5 '>
                <div className='relative w-full h-full max-h-[300px] overflow-hidden flex items-center'>
                    <div className='absolute inset-0 bg-black bg-opacity-40'></div>
                    <img src="../src/assets/image/banner-user.jpg" className='w-full h-full object-cover' alt="" />
                </div>
                <div className='page-content relative h-[240px] md:h-[120px] lg:h-[150px] flex justify-between bg-white
                    rounded-xl flex-col items-center'>
                    <div className=' flex flex-col items-center md:flex-row w-full absolute bottom-0 left-1/2 
                    -translate-x-1/2 md:left-0 md:translate-x-0  md:items-stretch p-5 lg:p-10 gap-5'>
                        <div className='w-32 h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden'>
                            <img src={dataCustomer?.image} className='w-full h-full object-cover '
                                alt="" />
                        </div>
                        <div className='flex-1 gap-y-5 mt-auto flex flex-col items-center md:flex-row 
                            md:items-stretch justify-between'>
                            <div className='text-center md:text-start'>
                                <h1 className='text-xl md:text-2xl font-medium font-quicksand uppercase'
                                >{dataCustomer?.full_name}</h1>
                                <span>@{dataCustomer?.user_name}</span>
                            </div>
                            <div className=' flex gap-x-5 items-center'>
                                <div className='p-2 bg-primary text-white text-2xl flex items-center justify-center
                                    border-2 border-primary rounded-md'>
                                    <CommentIcon></CommentIcon>
                                </div>
                                {/* <Button>Follow</Button> */}
                                {isAuth && <Button className='bg-transparent !text-primary font-medium border-primary'>
                                    Chỉnh sửa thông tin</Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-5 page-content'>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='md:w-1/3 w-full'>
                        <div className=' flex-auto h-auto bg-white rounded-xl p-5 flex
                        flex-col gap-y-5 md:gap-y-10'>
                            <h1 className='font-bold text-xl text-primary text-center md:text-start'>Thông tin cá nhân</h1>
                            <div className='text-base md:text-sm '>
                                <WrapInfo>
                                    <UserIcon /> <p>{dataCustomer?.full_name}</p>
                                </WrapInfo>
                                <WrapInfo>
                                    <EmailIcon /> <p className='w-[80%]'>{dataCustomer?.email || 'Chưa có'}</p>
                                </WrapInfo>
                                <WrapInfo>
                                    <LocationIcon /> <p>{dataCustomer?.address || 'Chưa có'}</p>
                                </WrapInfo>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 bg-white rounded-xl p-5 flex flex-col gap-y-10'>
                        <h1 className='font-bold text-xl text-primary text-center md:text-start'>Danh sách bài viết</h1>
                        <ListPost data={dataPostsByCustomer} message={'Chưa có bài viết nào!'} className='!grid-cols-1 md:!grid-cols-1 lg:!grid-cols-2'>
                        </ListPost>
                    </div>
                </div>
            </div>
            <EditCustomer></EditCustomer>
        </div>
    );
};

export default InfoUser;

const WrapInfo = ({ children }) => {
    return (
        <div className='flex items-center gap-x-4 py-4 border-b last:border-0 break-words w-full'>
            {children}
        </div>
    )
}
const EditCustomer = () => {
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', })
    const handleEditUser = (value) => {
    }
    return (
        <div className='absolute top-16 right-0 bg-white p-10'>
            <Overlay show={true}>

                <form onSubmit={handleSubmit(handleEditUser)} className=' px-2 z-10'>
                    <div className=' flex justify-between items-center border-b border-primary pb-5'>
                        <Heading isHeading className=''>Profile</Heading>
                        <Button type='submit'>SAVE</Button>
                    </div>
                    <div className='flex gap-x-5 items-center my-10'>
                        <Avatar className='!h-20 !w-20 md:!h-24 md:!w-24'></Avatar>
                        <div className='flex-1 flex items-center gap-x-5'>
                            <Button className=''>Change photo</Button>
                            <Button className='bg-white !text-black border-primary'>Delete</Button>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3 gap-x-10'>
                        <Field>
                            <Input control={control} value={''} errors={errors}
                                placeholder='Full name' type='text' name='full_name'>
                                <UserIcon></UserIcon>
                            </Input>
                        </Field>
                        <Field>
                            <Input control={control} value={''} errors={errors}
                                placeholder='User Name' type='text' name='user_name' >
                                <AtIcon></AtIcon>
                            </Input>
                        </Field>
                        <Field>
                            <Input control={control} value={''} errors={errors}
                                placeholder='Email' type='email' name='email' >
                                <EmailIcon></EmailIcon>
                            </Input>
                        </Field>
                        <Field>
                            <Input control={control} value={''} errors={errors}
                                placeholder='Address' type='text' name='address' >
                                <LocationIcon></LocationIcon>
                            </Input>
                        </Field>
                        <Field>
                            <InputPassword control={control} value={''} errors={errors}
                                placeholder='Password' name='password'>
                                <LockIcon></LockIcon>
                            </InputPassword>
                        </Field>
                    </div>
                </form>
            </Overlay>

        </div>

    )
}