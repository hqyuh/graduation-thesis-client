import React from 'react'
import { useAuth } from '../context/auth/auth.provider'

const HomePage = () => {
  const { currentUser } = useAuth()
  return <div>{currentUser?.username}</div>
}

export default HomePage
