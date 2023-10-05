import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Label } from '../label';
import useImagePreview from '../../hooks/useImagePreview';
import { Typography } from '../typography';



const FileInput = ({ name, className = '', oldImage, errors, lable, control, ...props }) => {

    const isErr = !!errors?.[name]

    const { field: { value, ...inputField } } = useController({
        control, name,
    })
    const { handleFileChange, preview, clearPreview } = useImagePreview(inputField.onChange);
    const [imageOld, setImageOld] = useState(oldImage);
    const handleSetImage = () => {
        clearPreview()
        setImageOld('')
        inputField.onChange(null);
    }
    const handleOnChange = (e) => {
        inputField.onChange(e.target.files[0]);
        handleFileChange(e)
    }
    return (
        <>
            <div className={`relative mt-3 h-full w-full  overflow-hidden min-h-[200px] lg:min-h-[300px] `}>
                <label htmlFor={name} className={`block w-full h-full 
                    rounded-lg bg-gray-200 focus:bg-white cursor-pointer absolute ${isErr ? "border border-red-500" : ''}`}>
                    <input type='file'
                        id={name}
                        hidden
                        {...inputField}
                        {...props}
                        onChange={handleOnChange}
                    />
                    {!preview &&
                        <div className=' absolute inset-0 flex justify-center items-center cursor-pointer'>
                            <div className='flex flex-col justify-center items-center gap-5'>
                                <img src='../../src/assets/img-upload.png'
                                    alt="preview" className=" w-16 h-16 object-cover" />
                                <p className='text-sm font-body font-semibold '>Choose image</p>
                            </div>
                        </div>
                    }
                </label>
                {preview &&
                    <PreviewImage imageOld={imageOld} preview={preview} onClick={handleSetImage}></PreviewImage>
                }
                {!preview && imageOld &&
                    <PreviewImage imageOld={imageOld} preview={preview} onClick={handleSetImage}></PreviewImage>

                }
            </div>
            {isErr ? (
                <Typography error={errors?.[name]} className={' text-xs text-[#E74C3C]'}>
                    {errors?.[name]?.message}</Typography>
            ) : null}
        </>
    );
};

const PreviewImage = ({ onClick = () => { }, preview, imageOld }) => {
    return (
        <div className='w-full h-full absolute rounded-lg overflow-hidden border'>
            <div className=' absolute inset-0 flex justify-center items-center group transition-all'>
                <FontAwesomeIcon
                    onClick={onClick}
                    className='p-5 rounded-full bg-white text-lg cursor-pointer lg:invisible border shadow-soft
                                    lg:opacity-0 group-hover:opacity-100 group-hover:visible transition-all'
                    icon={faTrashCan} bounce />
            </div>
            <img src={preview || imageOld} alt="preview" className=" w-full h-full object-cover" />
        </div>
    )
}

export default FileInput;