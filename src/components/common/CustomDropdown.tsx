import React from 'react';
import { useFormikContext, useField } from 'formik';

interface SelectProps {
    name: string;
    label: string;
    options: Array<{
        label: string; value: string | number
    }>;
    selectedValue?: string | number
}

const CustomDropdown: React.FC<SelectProps> = ({ selectedValue, label, options, ...props }) => {
    const [field, meta] = useField(props);
    const { setFieldValue } = useFormikContext();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFieldValue(props.name, event.target.value);
    };

    return (
        <div className='p-[8px]'>
            <label className="block text-sm font-medium text-white" htmlFor={props.name}>{label}</label>
            <select
                className="text-[#000] mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...field} {...props} onChange={handleChange}>
                {options.map((option, index) => {
                    if (label === "ProfessionalSummary") {
                       //
                    }
                    return <option
                        // selected={option.value === selectedValue}
                        key={index} value={option.value}>
                        {option.label}
                    </option>
                })}
            </select>
            {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </div>
    );
};

export default CustomDropdown;
