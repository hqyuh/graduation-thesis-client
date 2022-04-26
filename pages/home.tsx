/* eslint-disable jsx-a11y/anchor-is-valid */
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import ActivityIcon from '../icons/ActivityIcon'
import ClassesIcon from '../icons/ClassesIcon'
import HomeIcon from '../icons/HomeIcon'
import LogoHomePage from '../icons/LogoHomePage'
import SettingIcon from '../icons/SettingIcon'
import Search from '../components/Search'

const HomePage: NextPage = () => (
    <div className="home-page d-flex align-items-center text-muted shadow w-100">
      <header className="navbar navbar-expand bg-white d-flex align-items-center justify-content-between w-100">
        <div className="d-flex h-100">
          <LogoHomePage />
          <Search />
          <Link href="">
            <a
              role="button"
              className="home-item nav-item mx-3 d-flex justify-content-center align-items-center fw-bold">
              <HomeIcon />
              <span className="mx-1">Home</span>
            </a>
          </Link>
          <Link href="">
            <a
              role="button"
              className="activity-item nav-item mx-3 d-flex justify-content-center align-items-center fw-bold">
              <ActivityIcon />
              <span className="mx-1">Activity</span>
            </a>
          </Link>
          <Link href="">
            <a
              role="button"
              className="classes-item nav-item mx-3 d-flex justify-content-center align-items-center fw-bold">
              <ClassesIcon />
              <span className="mx-1">Classes</span>
            </a>
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <button className="btn-login btn btn-secondary rounded-10 fw-bold mx-2" type="button">Login</button>
          <button className="btn-register btn btn-secondary rounded-10 fw-bold mx-2" type="button">Register</button>
          <SettingIcon />
        </div>
      </header>
    </div>
  )
export default HomePage
