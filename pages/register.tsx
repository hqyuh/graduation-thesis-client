/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik } from 'formik'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Password } from 'primereact/password'
import React from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import InputWrapper from '../components/InputText'
import { YUP_MESSAGE } from '../constants'
import { useAuth } from '../context/auth/auth.provider'
import { UserSignUp } from '../context/auth/auth.types'
import { useTranslations } from '../context/Localization'

const schema = yup.object().shape({
  email: yup.string().email(YUP_MESSAGE.EMAIL).required(YUP_MESSAGE.REQUIRED),
  password: yup.string().required(YUP_MESSAGE.REQUIRED),
  firstName: yup.string().required(YUP_MESSAGE.REQUIRED),
  lastName: yup.string().required(YUP_MESSAGE.REQUIRED),
  username: yup.string().required(YUP_MESSAGE.REQUIRED),
})

const initialValues: UserSignUp = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  username: '',
}

const Register: NextPage = () => {
  const { t } = useTranslations()
  const { register } = useAuth()
  const router = useRouter()
  const onSubmit = (values: UserSignUp): void => {
    register(values).then(()=> {
      router.replace('/login')
      toast.success('Register successfully!')
    })
  }

  const formik = useFormik<UserSignUp>({
    initialValues,
    onSubmit,
    validationSchema: schema,
  })
  const { handleChange, handleSubmit, errors } = formik

  return (
    <div className="container py-3">
      <form className="login-form text-center m-auto card px-5 rounded-15 pb-5" onSubmit={handleSubmit}>
        <div className="title font-size-50 mt-5 mb-2 font-weight-900">{t('register')}</div>
        <div className="mt-3 mb-3">
          <InputWrapper
            placeholder="First Name"
            className="p-inputtext text"
            onChange={handleChange}
            name="firstName"
            formik={formik}
          />
        </div>
        <div className="mt-3 mb-3">
          <InputWrapper
            placeholder="Last Name"
            className="p-inputtext text"
            onChange={handleChange}
            name="lastName"
            formik={formik}
          />
        </div>
        <div className="mt-3 mb-3">
          <InputWrapper
            placeholder="Email"
            className="p-inputtext text"
            onChange={handleChange}
            name="email"
            formik={formik}
          />
        </div>
        <div className="mt-3 mb-3">
          <InputWrapper
            placeholder="Username"
            className="p-inputtext text"
            onChange={handleChange}
            name="username"
            formik={formik}
          />
        </div>
        <div className="mt-3 mb-3">
          <Password
            mediumRegex="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
            placeholder="Password"
            className="password"
            inputClassName="w-100 text"
            toggleMask
            onChange={handleChange}
            name="password"
          />
          <p className="text-start font-size-12 text-danger mb-0 mt-1">{errors?.password}</p>
        </div>
        <div className="form-group">
          <button className="w-100 btn btn-primary mt-4 mb-2 text-white font-weight-900" type="submit">
            {t('signup')}
          </button>
        </div>
        <div className=" text-end mb-3">
          <Link href="/login">
            <a className="forgot-password">Already has an account?</a>
          </Link>
        </div>
      </form>
    </div>
  )
}
export default Register
