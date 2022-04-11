import React from 'react'
import Header from '../shared/Header'
import Sidebar from '../shared/Sidebar'

const Layout: React.FC = ({ children }) => (
    <div className="d-flex">
      <Sidebar />
      <main className="w-100">
      <Header />
        <div className="p-4">{children}</div>
      </main>
    </div>
  )

export default Layout
