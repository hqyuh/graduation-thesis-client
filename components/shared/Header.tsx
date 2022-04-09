import React from 'react'
import { useTranslations } from '../../context/Localization'

const Header: React.FC = () => {
  const { t } = useTranslations()
  return (
    <header className="bg-primary navbar navbar-expand-lg sticky-top navbar-dark flex-md-nowrap shadow">
      
    </header>
  )
}

export default Header
