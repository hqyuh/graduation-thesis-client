import React from 'react'
import Header from '../shared/Header'
import Sidebar from '../shared/Sidebar'

const Layout: React.FC = ({ children }) => (
    <div className="d-flex">
      <Sidebar />
      <main className="w-100">
      <Header />
        {children}
      </main>
    </div>
  )

export default Layout
