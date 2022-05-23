import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/lib/upload'
import { FormikHelpers, useFormik } from 'formik'
import { Calendar } from 'primereact/calendar'
import { Password } from 'primereact/password'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import InputWrapper from '../components/InputText'
import { YUP_MESSAGE } from '../constants'
import { useAuth } from '../context/auth/auth.provider'
import { CurrentUserModel, UserChangeInfo } from '../context/auth/auth.types'
import { useTranslations } from '../context/Localization'
import withAuth from '../hocs/withAuth'
import ExamService from '../services/exam-service'
import getLayout from '../shared/getLayout'
import { NextPageWithLayout } from './_app'



const Setting: NextPageWithLayout = () => {
  const { currentUser } = useAuth()
  const [imageURL, setImageURL] = useState(currentUser?.avatar)
  const [imageString, setImageString] = useState(currentUser?.avatar)
  useEffect(() => {
    const url = imageURL && URL.createObjectURL(imageURL)
    setImageString(url)
    return () => {
      if(url){
        URL.revokeObjectURL(url)
      }
    }
  },[imageURL])
  const { t } = useTranslations()
  const onSubmit = (value: CurrentUserModel, formikHelpers: FormikHelpers<CurrentUserModel>): void => {
    const formData = new FormData()
    for(const key in value){
      formData.append(key, value[key])
    }
    formData.append('avatar', imageURL || currentUser?.avatar)
    ExamService.patchMe(formData).then(()=> {
      toast.success('Chỉnh sửa thông tin cá nhân thành công')
    }).catch(() => {
      toast.error('Chỉnh sửa thông tin cá nhân thất bại')
    })
  }
  const handleUpload = async ({ file }: { file: string | Blob | RcFile | File }) => {
    try {
      setImageURL(file)
    } catch (error ) {
      toast.error(error as string)
    }
  }
  const formik = useFormik<CurrentUserModel>({
    initialValues: {
      ...currentUser,
    },
    onSubmit,
  })
  const { handleChange, handleSubmit } = formik

  return (
    <div className="info d-flex flex-column justify-content-center align-items-center">
      {currentUser?.username}
      <div className="avatar-info position-relative">
        <ImgCrop grid shape="round">
          <Upload
            accept="image/*"
            customRequest={handleUpload}
            showUploadList={false}
            maxCount={1}
            progress={{
              strokeWidth: 4,
              showInfo: false,
            }}>
            <>
            <img src={imageString || 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg'} alt="avatar" />
              </>
          </Upload>
        </ImgCrop>
        
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
            label={t('Email') || 'Email'}
          />
          <InputWrapper
            className="p-inputtext text"
            onChange={handleChange}
            name="phone"
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
            value={formik.values.dateofbirth}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="btn-change btn btn-primary rounded-15" onClick={handleSubmit} type="button">
        {t('Save Changes')}
      </div>
    </div>
  )
}

const WithAuthSetting = withAuth(Setting)

WithAuthSetting.getLayout = getLayout

export default WithAuthSetting
