import React, { ReactElement, ReactNode } from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import Provider from './Provider'

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return <Provider>{getLayout(<Component {...pageProps} />)}</Provider>
}

export default MyApp
