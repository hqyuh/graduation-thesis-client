/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { InputText } from 'primereact/inputtext'
import Link from 'next/link'
import { NextPage } from 'next'
import { Password } from 'primereact/password'
import { FaceBookIcon } from '../icons'
import GoogleIcon from '../icons/GoogleIcon'
import { useTranslations } from '../context/Localization'

const Login: NextPage = () => {
  const { t } = useTranslations()
  return (
    <div className="container">
      <div className="login-form text-center m-auto card px-5 rounded-15 pb-5">
        <div className="title font-size-50 mt-5 mb-2 font-weight-900">{t('register')}</div>
        <div className="mt-3 mb-3">
          <InputText placeholder="First Name" className="p-inputtext text" />
        </div>
        <div className="mt-3 mb-3">
          <InputText placeholder="Last Name" className="p-inputtext text" />
        </div>
        <div className="mt-3 mb-3">
          <InputText placeholder="Email" className="p-inputtext text" />
        </div>
        <div className="mt-3 mb-3">
          <Password
            mediumRegex="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
            placeholder="Password"
            className="password"
            inputClassName="w-100 text"
            toggleMask
          />
        </div>
        <div className="form-group">
          <button className="w-100 btn btn-primary mt-4 mb-2 text-white font-weight-900" type="submit">
            {t('signup')}
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
