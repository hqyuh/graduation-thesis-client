/* eslint-disable jsx-a11y/anchor-is-valid */
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import ActivityIcon from '../icons/ActivityIcon'
import ClassesIcon from '../icons/ClassesIcon'
import HomeIcon from '../icons/HomeIcon'
import LogoHomePage from '../icons/LogoHomePage'
import SettingIcon from '../icons/SettingIcon'
import Search from '../components/Search'
import { useRouter } from 'next/router'
import { InputText } from 'primereact/inputtext'
import PeopleIcon from '../icons/PeopleIcon'

const HomePage: NextPage = () => {
  const [code,setCode] = useState('')
  const router = useRouter()
  const handleExam = () => {
    router.replace(`/test/${code}`)
  }
  return (
   <main>
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
          <button className="btn-login btn btn-secondary rounded-10 fw-bold mx-2" type="button" onClick={()=> router.push('/login')}>Login</button>
          <button className="btn-register btn btn-secondary rounded-10 fw-bold mx-2" type="button" onClick={() => router.push('/register')}>Register</button>
          <SettingIcon />
        </div>
      </header>
    </div>
    <div className="home-page-content d-flex justify-content-between">
      <div className="content1 rounded-10 d-flex col-7 align-items-center justify-content-center m-4 shadow">
        <span className=" d-flex justify-content-between px-3 py-2 rounded-15">
          <InputText
            className="text rounded-10"
            placeholder="Nhập mã code bài thi"
            id="input-text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=> {
              setCode(event.target.value)
            }}
          />
          <button className="btn-join btn btn-secondary rounded-10 fw-bold mx-2" type="button" onClick={handleExam}>JOIN</button>
        </span>
      </div>
      <div className="content2 rounded-10 d-flex col align-items-center justify-content-center shadow flex-column">
        <button className="btn btn-create-account fw-bold py-2 px-4 rounded-40 shadow" type="button">
          <PeopleIcon />
         Create an account
        </button>
        <div>
        <button className="d-inline-flex align-items-center btn-login btn btn-secondary rounded-10 fw-bold mx-2 border"type="button">Login</button>
          <button className="d-inline-flex align-items-center btn-register btn shadow rounded-10 my-3 fw-bold"type="button">Register</button>
        </div>
        <div />
        <p className='fw-bold my-1'>0-string of days</p>
      </div>
    </div>
   </main>
  )
}

export default HomePage