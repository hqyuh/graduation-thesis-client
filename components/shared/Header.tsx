import React, { useMemo } from 'react'
import { SplitButton } from 'primereact/splitbutton';
import { useTranslations } from '../../context/Localization'
import { useAuth } from '../../context/auth/auth.provider';
import { MenuItem } from 'primereact/menuitem/menuitem';

const Header: React.FC = () => {
  const {currentUser} = useAuth()
  const { t } = useTranslations()

  const menu : MenuItem[] = useMemo(()=> [
    {
      label: t('logout'),
      icon: 'pi pi-power-off',
    },
  ], [t])

  return (
    <header className="bg-white navbar navbar-expand-lg sticky-top navbar-dark flex-md-nowrap shadow py-4 px-3">
      <div className="d-flex justify-content-between w-100 align-items-center"><h4 className="font-weight-300 font-size-20 text-dark">Quản lý bài thi</h4>
      <SplitButton 
      model={menu}
      label={currentUser?.username || 'User'} 
      className="p-button-plain p-button-outlined p-button-raised rounded-10" 
      buttonClassName="rounded-10"
      menuClassName="z-up"
      />
      </div>
    </header>
  )
}

export default Header
