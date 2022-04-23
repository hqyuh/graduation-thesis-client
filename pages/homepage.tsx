import { NextPage } from 'next'
import React from 'react'
import LogoHomePage from '../icons/LogoHomePage'
import HomeIcon from '../icons/HomeIcon'
import ActivityIcon from '../icons/ActivityIcon'
import ClassesIcon from '../icons/ClassesIcon'
import HomePageSearch from './homepagesearch'
import HomePageContent from './homepagecontent'
import SettingIcon from '../icons/SettingIcon'
import Link from 'next/link'
import { useTranslations } from '../context/Localization'
import { useAuth } from '../context/auth/auth.provider'

const HomePage: React.FC = () => {
  const { t } = useTranslations()
  const { homepage } = useAuth()

  return (
    <div>
      <div className="home-page d-flex align-items-center text-muted shadow w-100">
        <header className="navbar navbar-expand bg-white d-flex align-items-center justify-content-between w-100">
          <div className="d-flex h-100">
            <LogoHomePage />
            <HomePageSearch />
            <Link href={''}>
              <a
                role="button"
                className="home-item nav-item mx-3 d-flex justify-content-center align-items-center fw-bold">
                <HomeIcon />
                <span className="mx-1">{t('Home')}</span>
              </a>
            </Link>
            <Link href={''}>
              <a
                role="button"
                className="activity-item nav-item mx-3 d-flex justify-content-center align-items-center fw-bold">
                <ActivityIcon />
                <span className="mx-1">{t('Activity')}</span>
              </a>
            </Link>
            <Link href={''}>
              <a
                role="button "
                className="classes-item nav-item mx-3 d-flex justify-content-center align-items-center fw-bold">
                <ClassesIcon />
                <span className="mx-1">{t('Classes')}</span>
              </a>
            </Link>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn-login btn btn-secondary rounded-10 fw-bold mx-2">{t('Login')}</button>
            <button className="btn-register btn btn-secondary rounded-10 fw-bold mx-2">{t('Register')}</button>
            <SettingIcon />
          </div>
        </header>
      </div>
      <div>
        {' '}
        <HomePageContent />
      </div>
    </div>
  )
}
export default HomePage
