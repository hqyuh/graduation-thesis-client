import * as React from 'react'
import Header from '../shared/Header'
import Sidebar from '../shared/Sidebar'

const Layout: React.FC = ({ children }) => {
  

  return (
    <>
        <Header />
        <main>
          <Sidebar />
          {children}
        </main>
    
    </>
  )
}

export default Layout
