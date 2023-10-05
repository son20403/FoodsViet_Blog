import React from 'react';
import { Heading } from '../components/heading';
import { Field } from '../components/field';
import { Label } from '../components/label';
import { FileInput, Input } from '../components/input';
import { BookmarkIcon } from '../components/Icon';
import { useForm } from "react-hook-form"
import { Select } from '../components/select';
import { Textarea } from '../components/textarea';
import { Button } from '../components/button';
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup";
const schemaValidate = Yup.object({
    title: Yup.string().required("Vui lòng nhập tiêu đề!"),
    content: Yup.string().required("Vui lòng nhập nội dung!"),
    image: Yup.mixed().required("Vui lòng nhập ảnh!"),

    // .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),

})
const AddNewPosts = () => {
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', })
    const handleSubmits = (value) => {
        console.log(value)
    }
    return (
        <div className='page-content mt-5 px-2'>
            <Heading isHeading>Thêm bài viết </Heading>
            <form onSubmit={handleSubmit(handleSubmits)} className='mb-10 text-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 pt-10 mb-10'>
                    <Field>
                        <Input control={control} errors={errors} value='' name='title'
                            placeholder='Nhập tiêu đề bài viết' type='text' >
                            <BookmarkIcon />
                        </Input>
                    </Field>
                    <Field>
                        <Select control={control} name={'select_demo'} value='' />
                    </Field>
                    <div className=' col-span-1 md:col-span-2 mb-10'>
                        <Label htmlFor={"image"}>Hình ảnh</Label>
                        <FileInput
                            control={control} name={'image'} errors={errors} lable={'Hình ảnh'} />
                    </div>
                    <div className=' col-span-1 md:col-span-2'>
                        <Field>
                            <Label htmlFor={'content'}>Nội dung</Label>
                            <Textarea control={control} errors={errors} name={'content'} />
                        </Field>
                    </div>
                </div>
                <Button type='submit' className=' mx-auto'>Thêm bài viết</Button>
            </form>
        </div>
    );
};

export default AddNewPosts;