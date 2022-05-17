import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { NO_AUTHORIZE_PATHNAME } from '../../constants'
import { ApiResponse } from '../../lib/client'
import authServices from './auth-service'
import { AuthContextApi, CurrentUserModel, UserRole, UserSignIn, UserSignUp } from './auth.types'

const AuthContext = createContext<AuthContextApi>({} as AuthContextApi)

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserModel | null>(null)
  const [error, setError] = useState<ApiResponse | null>()
  const [loadingInitial, setLoadingInitial] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()
  useEffect(() => {
    // Chuyển sang router khác thì xóa error ở router cũ đi
    if (error) setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  useEffect(() => {
      authServices
        .getCurrentUser()
        .then((res) => {
          setCurrentUser(res.data || null)
        })
        .catch((res) => {
          setError(res.message)
        })
        .finally(() => setLoadingInitial(true))
  }, [router.pathname])

  const login = (user: UserSignIn): Promise<void> =>
    authServices
      .login(user)
      .then((res) => {
        setCurrentUser(res.data)
        toast.success('Welcome to quizz online')
        if(res.data.role === UserRole.ROLE_USER){
        router.replace('/')
        } else {
          router.replace('/exam-management')
        }
      })
      .catch((res) => {
        toast.error(res.message)
        setError(res.message)
      })

  const register = (user: UserSignUp): Promise<void> =>
    authServices
      .register(user)
      .then((res) => {
        toast.success(res.message)
        setCurrentUser(res.data)
      })
      .catch((res) => {
        toast.error(res.message)
        setError(res.message)
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoState = useMemo(() => ({ currentUser, login, error, register }), [currentUser, error])

  if (NO_AUTHORIZE_PATHNAME.indexOf(router.pathname) > - 1 && currentUser) {
    router.push('/')
    return null
  }

  return <AuthContext.Provider value={memoState}>{loadingInitial && children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuth = (): AuthContextApi => useContext(AuthContext)
