import { useRouter } from 'next/router'
import { MenuItem } from 'primereact/menuitem/menuitem'
import { SplitButton } from 'primereact/splitbutton'
import React, { useMemo } from 'react'
import { ACCESS_TOKEN_KEY, HEADER_TITLE_ENUM } from '../../constants'
import { useAuth } from '../../context/auth/auth.provider'
import { useTranslations } from '../../context/Localization'
import { removeFromLocalStorage } from '../../lib/localStorage'

const Header: React.FC = () => {
  const { currentUser } = useAuth()
  const { t } = useTranslations()
  const router = useRouter()
  const menu: MenuItem[] = useMemo(
    () => [
      {
        label: t('logout'),
        icon: 'pi pi-power-off',
        command: () => {
          removeFromLocalStorage(ACCESS_TOKEN_KEY)
          router.replace('/login')
        }
      },
    ],
    [t],
  )
  return (
    <header className="bg-white navbar navbar-expand-lg sticky-top navbar-dark flex-md-nowrap shadow py-4 px-3">
      <div className="d-flex justify-content-between w-100 align-items-center">
        <h4 className="font-weight-300 font-size-20 text-dark">
          {(router.pathname.startsWith('/test') && 'Làm bài thi') || HEADER_TITLE_ENUM[router.pathname as keyof typeof HEADER_TITLE_ENUM] || 
          'Quản lý bài thi'} 
        </h4>
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
