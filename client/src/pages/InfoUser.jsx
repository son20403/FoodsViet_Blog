import React from 'react';
import { Heading } from '../components/heading';
import { Button } from '../components/button';
import Avatar from '../layout/customers/Avatar';
import { AtIcon, EmailIcon, LocationIcon, LockIcon, UserIcon } from '../components/Icon';
import { Input } from '../components/input';
import { Field } from '../components/field';
import InputPassword from '../components/input/InputPassword';
import ListPost from '../layout/posts/ListPost';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";

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
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', })
    const handleEditUser = (value) => {
        console.log("🚀 ~ file: InfoUser.jsx:37 ~ handleEditUser ~ value:", value)
    }
    return (
        <div className='my-10 page-content'>
            <form onSubmit={handleSubmit(handleEditUser)} className=' px-2'>
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
                        {/* <Label htmlFor='full_name'>Full name</Label> */}
                        <Input control={control} value={''} errors={errors}
                            placeholder='Full name' type='text' name='full_name'>
                            <UserIcon></UserIcon>
                        </Input>
                    </Field>
                    <Field>
                        {/* <Label htmlFor='user_name'>User name</Label> */}
                        <Input control={control} value={''} errors={errors}
                            placeholder='User Name' type='text' name='user_name' >
                            <AtIcon></AtIcon>
                        </Input>
                    </Field>
                    <Field>
                        {/* <Label htmlFor='email'>Email</Label> */}
                        <Input control={control} value={''} errors={errors}
                            placeholder='Email' type='email' name='email' >
                            <EmailIcon></EmailIcon>
                        </Input>
                    </Field>
                    <Field>
                        {/* <Label htmlFor='address'>Address</Label> */}
                        <Input control={control} value={''} errors={errors}
                            placeholder='Address' type='text' name='address' >
                            <LocationIcon></LocationIcon>
                        </Input>
                    </Field>
                    <Field>
                        {/* <Label htmlFor='password'>Password</Label> */}
                        <InputPassword control={control} value={''} errors={errors}
                            placeholder='Password' name='password'>
                            <LockIcon></LockIcon>
                        </InputPassword>
                    </Field>
                </div>
            </form>
            <div className='my-10'>
                <Heading isHeading className='mb-10 mx-2'>
                    Popular Category
                </Heading>
                <ListPost></ListPost>
            </div>
        </div>
    );
};

export default InfoUser;