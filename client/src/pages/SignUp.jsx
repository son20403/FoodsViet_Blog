import React, { useEffect } from 'react';
import { Input, InputPassword } from '../components/input';
import { UserIcon } from '../components/Icon';
import { Button } from '../components/button';
import AuthenWrap from '../layout/common/AuthenWrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../sagas/auth/authSlice';
import { toast } from 'react-toastify';
const schemaValidate = Yup.object({
    user_name: Yup.string().required("Vui lòng nhập tên đăng nhập!"),
    full_name: Yup.string().required("Vui lòng nhập họ và tên!"),
    password: Yup.string().required("Vui lòng nhập mật khẩu!"),
    email: Yup.string().required("Vui lòng nhập email!"),
})
const SignUp = () => {
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', })
    const { error, loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const handleSubmits = (value) => {
        dispatch(registerRequest(value))
    }
    useEffect(() => {
        if (error) toast.error(error)
    }, [error]);
    return (
        <AuthenWrap heading={'Đăng Ký'}>
            <form action="" onSubmit={handleSubmit(handleSubmits)}
                className='flex flex-col gap-4 w-1/2 m-auto
                            md:w-full bg-white p-10 rounded-3xl shadow-3xl border-opacity-50 border-4 border-primary' >
                <Input control={control} type='text' name={'user_name'} errors={errors} placeholder='Tài khoản'
                    value='' ><UserIcon /></Input>
                <Input control={control} type='text' name={'full_name'} errors={errors} placeholder='Họ và tên'
                    value='' ><UserIcon /></Input>
                <InputPassword control={control} name={'password'} errors={errors} placeholder='Mật khẩu'
                    value='' ><UserIcon /></InputPassword>
                <Input control={control} type='email' name={'email'} errors={errors} placeholder='Email'
                    value='' ><UserIcon /></Input>
                <Button type='submit' >Đăng ký</Button>
                <p className='text-sm'>Bạn đã có tài khoản? <Link to={'/signin'}><span className='text-primary'>
                    Đăng nhập</span></Link></p>
            </form>
        </AuthenWrap>
    );
};
export default SignUp;
