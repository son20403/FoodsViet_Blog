import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import AuthenWrap from '../layout/common/AuthenWrap';
import { Input, InputPassword } from '../components/input';
import { UserIcon } from '../components/Icon';
import { Button } from '../components/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../sagas/auth/authSlice';
import { toast } from 'react-toastify';
const schemaValidate = Yup.object({
    user_name: Yup.string().required("Vui lòng nhập tên đăng nhập!"),
    password: Yup.string().required("Vui lòng nhập mật khẩu!"),
    // .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),

})
const SignIn = () => {
    const dispatch = useDispatch()
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', })
    const { error, token, loading } = useSelector((state) => state.auth)
    const handleSubmits = (value) => {
        dispatch(loginRequest(value))
    }
    useEffect(() => {
        if (error) toast.error(error.message)
    }, [error]);
    return (
        <AuthenWrap isSignIn heading={'Đăng Nhập'}>
            <form action="" onSubmit={handleSubmit(handleSubmits)}
                className='flex flex-col gap-6 w-1/2 m-auto
                        md:w-full bg-white p-10 rounded-3xl shadow-3xl border-opacity-50 border-4 border-primary' >
                <Input control={control} type='text' name={'user_name'} errors={errors} placeholder='Tài khoản'
                    value='' ><UserIcon /></Input>
                <InputPassword control={control} name={'password'} errors={errors} placeholder='Mật khẩu'
                    value='' ><UserIcon /></InputPassword>
                <Button isLoading={loading} type='submit' >Đăng nhập</Button>
                <p className='text-sm'>Bạn chưa có tài khoản? <Link to={'/signup'}>
                    <span className='text-primary'>Đăng ký</span></Link></p>
            </form>
        </AuthenWrap>
    );
};

export default SignIn;