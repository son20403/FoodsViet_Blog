import React from 'react';
import { useController } from "react-hook-form";
import { Input as InputCustom } from "@material-tailwind/react";
import { Typography } from '../typography';
const Input = ({ children, control, placeholder = 'Enter your content', type = 'text', name, value = '', errors }) => {
    const { field } = useController({ name, control, defaultValue: value, rules: { required: true } });
    const isErr = !!errors?.[name]
    return (
        <div>
            <div className='relative'>
                <InputCustom type={type} variant="standard" label={placeholder} {...field} icon={children}
                    color={isErr ? 'red' : 'gray'} className={isErr ? '!border-red-500' : ''} />
                {isErr ? (
                    <Typography error={errors?.[name]} className={' text-xs text-[#E74C3C]'}>
                        {errors?.[name]?.message}</Typography>
                ) : null}
            </div>
        </div>
    );
};

export default Input;