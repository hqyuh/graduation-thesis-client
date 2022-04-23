import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { useTranslations } from '../context/Localization'
import { useAuth } from '../context/auth/auth.provider'
import PeopleIcon from '../icons/PeopleIcon'
import GroupCalendarIcon from '../icons/GroupCalendarIcon'

const HomePageContent: React.FC = () => {
  const [value, setValue] = useState('')
  const { t } = useTranslations()
  const { homepagecontent } = useAuth()

  return (
    <div className="home-page-content d-flex justify-content-between">
      <div className="content1 rounded-10 d-flex col-7 align-items-center justify-content-center m-4 shadow">
        <span className=" d-flex justify-content-between px-3 py-2 rounded-15">
          <InputText
            className="rounded-10"
            placeholder={t('Enter your code')}
            id="input-text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="btn-join btn btn-secondary rounded-10 fw-bold mx-2">{t('JOIN')}</button>
        </span>
      </div>
      <div className="content2 rounded-10 d-flex col align-items-center justify-content-center shadow flex-column">
        <button className="btn btn-create-account fw-bold py-2 px-4 rounded-40 shadow">
          <PeopleIcon />
         {t('Create an account')}
        </button>
        <div>
        <button className="d-inline-flex align-items-center btn-login btn btn-secondary rounded-10 fw-bold mx-2 border">{t('Login')}</button>
          <button className="d-inline-flex align-items-center btn-register btn shadow rounded-10 my-3 fw-bold">{t('Register')}</button>
        </div>
        <div>
          <GroupCalendarIcon/>
        </div>
        <p className='fw-bold my-1'>0-string of days</p>
      </div>
    </div>
  )
}
export default HomePageContent
