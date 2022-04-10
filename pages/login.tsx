/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormikHelpers, useFormik } from 'formik'
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
import { UserSignIn } from '../context/auth/auth.types'
import { useTranslations } from '../context/Localization'
import { FaceBookIcon } from '../icons'
import GoogleIcon from '../icons/GoogleIcon'

const schema = yup.object().shape({
  email: yup.string().email(YUP_MESSAGE.EMAIL).required(YUP_MESSAGE.REQUIRED),
  password: yup.string().required(YUP_MESSAGE.REQUIRED),
})

const initialValues: UserSignIn = {
  email: '',
  password: '',
}

const Login: NextPage = () => {
  const { t } = useTranslations()
  const { login } = useAuth()
  const router = useRouter()
  const onSubmit = (value: UserSignIn, formikHelpers: FormikHelpers<UserSignIn>): void => {
    login(value).then(()=> {
      // router.replace('/')
      toast.success('Welcome to quizz online')
    })
    
  }
  const formik = useFormik<UserSignIn>({
    initialValues,
    onSubmit,
    validationSchema: schema,
  })
  const { handleChange, handleSubmit, errors } = formik

  return (
    <div className="container mx-auto py-5">
      <div className="login-form text-center m-auto card px-5 rounded-15 pb-5">
        <div className="title font-size-50 mt-5 mb-2 font-weight-900">{t('login')}</div>
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
          <button
            className="w-100 btn btn-primary mt-4 mb-2 text-white font-weight-900"
            type="submit"
            onClick={handleSubmit}
          >
            {t('signin')}
          </button>
        </div>
        <div className=" text-end mb-3">
          <Link href="/">
            <a className="forgot-password">Forgot Password?</a>
          </Link>
        </div>
        <div className="form-group mt-3 mb-1 p-1 rounded-8 row">
          <div className="col-4 text-end">
            <FaceBookIcon />
          </div>
          <div className="col-8 text-start d-flex align-items-center font-size-12">
            <a>Sign up with Facebook</a>
          </div>
        </div>
        <div className="form-group mt-1 mb-3 p-1 rounded-8 row">
          <div className="col-4 text-end">
            <GoogleIcon />
          </div>
          <div className="col-8 text-start d-flex align-items-center font-size-12">
            <a type="button">Sign up with Google</a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
