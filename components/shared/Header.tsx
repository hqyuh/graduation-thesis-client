import React from 'react'
import { useTranslations } from '../../context/Localization'

const Header: React.FC = () => {
  const { t } = useTranslations()
  return (
    <header className="bg-white navbar navbar-expand-lg sticky-top navbar-dark flex-md-nowrap shadow py-4">
      Quản lý bài thi
    </header>
  )
}

export default Header
