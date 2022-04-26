import React, { useState } from 'react'
import { useAuth } from '../context/auth/auth.provider'
import withAuth from '../hocs/withAuth'
import getLayout from '../shared/getLayout'
import { NextPageWithLayout } from './_app'
import CameraIcon from '../icons/CameraIcon'
import InputWrapper from '../components/InputText'
import { FormikHelpers, useFormik } from 'formik'
import { UserChangeInfo } from '../context/auth/auth.types'
import { Password } from 'primereact/password'
import { YUP_MESSAGE } from '../constants'
import * as yup from 'yup'
import { useTranslations } from '../context/Localization'
import { Calendar } from 'primereact/calendar'

const schema = yup.object().shape({
  email: yup.string().email(YUP_MESSAGE.EMAIL).required(YUP_MESSAGE.REQUIRED),
  password: yup.string().required(YUP_MESSAGE.REQUIRED),
})

const initialValues: UserChangeInfo = {
  username: '',
  name: '',
  email: '',
  password: '',
  phonenumber: '',
  dateofbirth: '',
}

const Setting: NextPageWithLayout = () => {
  const { currentUser } = useAuth()
  const { setting } = useAuth()
  const { t } = useTranslations()
  const onSubmit = (value: UserChangeInfo, formikHelpers: FormikHelpers<UserChangeInfo>): void => {
    setting(value)
  }
  const formik = useFormik<UserChangeInfo>({
    initialValues,
    onSubmit,
    validationSchema: schema,
  })
  const { handleChange, handleSubmit, errors, touched } = formik

  const [date, setDate] = useState(new Date())

  return (
    <div className="info d-flex flex-column justify-content-center align-items-center">
      {currentUser?.username}
      <div className="avatar-info position-relative">
        <img src="https://picsum.photos/300/300" alt="" />{' '}
        {/* Link ảnh em huy viết code nhé em thìn đoạn này k biết. */}
        <CameraIcon />
      </div>
      <div className="content-info d-flex">
        <div className="col d-flex flex-column">
          <InputWrapper
            className="p-inputtext text"
            onChange={handleChange}
            name="username"
            formik={formik}
            label={t('User name') || 'User name'}
          />
          <InputWrapper
            className="p-inputtext text"
            onChange={handleChange}
            name="email"
            formik={formik}
            label={t('Gmail') || 'Gmail'}
          />
          <InputWrapper
            className="p-inputtext text"
            onChange={handleChange}
            name="phonenumber"
            formik={formik}
            label={t('Phone number') || 'Phone number'}
          />
        </div>
        <div className="col justify-content-center d-flex flex-column">
          <InputWrapper
            className="p-inputtext text"
            onChange={handleChange}
            name="name"
            formik={formik}
            label={t('Full name') || 'Full name'}
          />
          <Password
            mediumRegex="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
            placeholder={t('Password')}
            className="password"
            inputClassName="w-100 text"
            toggleMask
            onChange={handleChange}
            name="password"
          />
          <Calendar
            placeholder={t('Date of birth')}
            name="dateofbirth"
            dateFormat="dd/mm/yy"
            value={'Chỗ này nếu lỗi mới hiển thị placeholder' || date}
            onChange={(e) => setDate(e.value)}></Calendar>
        </div>
      </div>
      <div className="btn-change btn btn-primary rounded-15">
          {t('Save Changes')}
      </div>
    </div>
  )
}

const WithAuthSetting = withAuth(Setting)

WithAuthSetting.getLayout = getLayout

export default WithAuthSetting
