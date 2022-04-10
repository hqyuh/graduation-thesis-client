import React from 'react'
import { useAuth } from '../context/auth/auth.provider'
import getLayout from '../shared/getLayout'
import { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = () => {
  const { currentUser } = useAuth()
  return <div>{currentUser?.username} Home page</div>
}

HomePage.getLayout = getLayout

export default HomePage
