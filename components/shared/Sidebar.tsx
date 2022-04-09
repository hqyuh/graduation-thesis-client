import React from 'react'
import { useTranslations } from '../../context/Localization'

const Sidebar: React.FC = () => {
  const { t } = useTranslations()

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar">
    </div>
  )
}

export default Sidebar
