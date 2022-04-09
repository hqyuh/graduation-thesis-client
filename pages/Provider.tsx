import NextNProgress from 'nextjs-progressbar'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import LanguageContext from '../context/Localization'
import AuthProvider from '../context/auth/auth.provider'

const Provider: React.FC = ({ children }) => (
  <AuthProvider>
    <LanguageContext>
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />

      {children}
    </LanguageContext>
  </AuthProvider>
)

export default Provider
