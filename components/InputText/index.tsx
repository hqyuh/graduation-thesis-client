/* eslint-disable prefer-destructuring */
/* eslint-disable react/require-default-props */
import { FormikProps } from 'formik';
import { InputText, InputTextProps } from 'primereact/inputtext'
import React from 'react'

interface InputProps {
    formik: FormikProps<any>;
}

const InputWrapper: React.FC<InputTextProps & InputProps> = ({formik,...props}) => {
    const name = props.name || '';
    const error = formik?.errors[name || ''];
    return (<div>
        <InputText {...props}/>
        <p className="font-size-12 mb-0 text-danger text-start mt-1">
            {
                (formik.touched[name])&& error
            }
        </p>
</div>)
}

 export default InputWrapper