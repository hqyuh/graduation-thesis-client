import React, { ReactElement } from 'react'
import Layout from '../components/layout'

export default function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
