import React from 'react';
import { Select as SelectCustom, Option } from "@material-tailwind/react";
import { useController } from 'react-hook-form';

const Select = ({ name, control, data = [] }) => {
    const { field } = useController({ name, control, defaultValue: '' });
    if (data && data.length > 0) {
        return (
            <SelectCustom variant="standard" label="Danh mục" {...field}>
                <Option>----- Chọn danh mục -----</Option>
                {data?.length > 0 && data.map((item) => (
                    <Option key={item?._id} value={item?._id}>{item?.title}</Option>
                ))}
            </SelectCustom>
        );
    } else {
        return (<SelectCustom variant="standard" label="Danh mục"  {...field}>
            <Option value=''>Loading....</Option>
        </SelectCustom>)
    }
};

export default Select;