import { useRouter } from 'next/router'
import React from 'react'
import { ACCESS_TOKEN_KEY, NO_AUTHORIZE_PATHNAME } from '../constants'
import { useAuth } from '../context/auth/auth.provider'
import { loadFromLocalStorage } from '../lib/localStorage'
import { NextPageWithLayout } from '../pages/_app'
import { getDisplayName } from './withToast'



const withAuth = <P extends object>(
  WrappedComponent: NextPageWithLayout<P>,
): NextPageWithLayout<P> => {
  const WithAuth: NextPageWithLayout<P> = (props) => {
    const { currentUser } = useAuth()
    const router = useRouter()
    const unAuthenticated = !currentUser || !loadFromLocalStorage(ACCESS_TOKEN_KEY)
    if (!NO_AUTHORIZE_PATHNAME.includes(router.pathname) && unAuthenticated) {
      router.replace('/login')
      return null
    }
    return <WrappedComponent {...props} isAuthenticated={Boolean(!unAuthenticated)} />
  }
  WithAuth.displayName = `WithAuth${getDisplayName<P>(WithAuth)}`
  return WithAuth
}

export default withAuth
