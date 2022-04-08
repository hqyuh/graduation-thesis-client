import React from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Provider from './Provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
