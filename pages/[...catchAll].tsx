import React from 'react'
import Layout from '../components/layout'
import NotFound from '../components/notFound'
import { useAuth } from '../context/auth/auth.provider'
import { NextPageWithLayout } from './_app'

const ErrorPage: NextPageWithLayout = () => (
  <div className="w-100 h-100">
    <h1 className="text-danger font-weight-800 font-size-40 text-center">404 Page Not Found</h1>
    <div className="w-100">
      <NotFound />
    </div>
  </div>
)

ErrorPage.getLayout = function GetLayout(page: React.ReactElement) {
  const { currentUser } = useAuth()
  if (!currentUser) {
    return page
  }
  return <Layout>{page}</Layout>
}

export default ErrorPage
