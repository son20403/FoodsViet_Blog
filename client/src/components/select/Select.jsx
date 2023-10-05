import React from 'react';
import { Select as SelectCustom, Option } from "@material-tailwind/react";
import { useController } from 'react-hook-form';

const Select = ({ name, control, value = '' }) => {
    const { field } = useController({ name, control, defaultValue: value, rules: { required: true } });
    return (
        <SelectCustom variant="standard" label="Select Version" {...field}>
            <Option value='1'>Material Tailwind HTML</Option>
            <Option value='2'>Material Tailwind React</Option>
            <Option value='3'>Material Tailwind Vue</Option>
            <Option value='4'>Material Tailwind Angular</Option>
            <Option value='5'>Material Tailwind Svelte</Option>
        </SelectCustom>
    );
};

export default Select;