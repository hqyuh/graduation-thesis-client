/* eslint-disable prefer-destructuring */
/* eslint-disable react/require-default-props */
import { FormikProps } from 'formik';
import { InputText, InputTextProps } from 'primereact/inputtext'
import React from 'react'

interface InputProps {
    formik: FormikProps<any>;
    label: string;
}

const InputWrapper: React.FC<InputTextProps & InputProps> = ({formik, label,...props}) => {
    const name = props.name || '';
    const error = formik?.errors[name || ''];
    return (<div>
        <span className="p-float-label">
        <InputText {...props} id={name}/>
        <label htmlFor={name}>{label}</label>
        </span>
        
        <p className="font-size-12 mb-0 text-danger text-start mt-1">
            {
                (formik.touched[name])&& error
            }
        </p>
</div>)
}

 export default InputWrapper