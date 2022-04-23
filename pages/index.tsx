import React from 'react'
import { useAuth } from '../context/auth/auth.provider'
import withAuth from '../hocs/withAuth'
import getLayout from '../shared/getLayout'
import { NextPageWithLayout } from './_app'

const HomePage: NextPageWithLayout = () => {
  const { currentUser } = useAuth()
  return <div>{currentUser?.username} Home page</div>
}

const WithAuthHomePage = withAuth(HomePage)

WithAuthHomePage.getLayout = getLayout

export default WithAuthHomePage
