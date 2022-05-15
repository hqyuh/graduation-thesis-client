/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useTranslations } from '../../context/Localization'
import { Logo } from '../../icons'
import AccountIcon from '../../icons/AccountIcon'
import BookIcon from '../../icons/BookIcon'
import ClassIcon from '../../icons/ClassIcon'
import LibIcon from '../../icons/LibIcon'
import MarkManagementIcon from '../../icons/MarkManage'
import PaperIcon from '../../icons/PaperIcon'
import StatsIcon from '../../icons/StatsIcon'
import UserIcon from '../../icons/UserIcon'
import WritingPaperIcon from '../../icons/WritingPaperIcon'

export interface MenuModel {
  icon: React.ReactNode
  label?: string
  router: string
}

const Sidebar: React.FC = () => {
  const { t } = useTranslations()
  const router = useRouter()
  const menu: MenuModel[] = useMemo(
    () => [
      {
        icon: <PaperIcon />,
        label: t('exam_name_manage'),
        router: '/exam-management',
      },
      {
        icon: <MarkManagementIcon />,
        label: t('mark_manage'),
        router: '/mark-management',
      },
      {
        icon: <ClassIcon />,
        label: t('class_manage'),
        router: '/class',
      },
      {
        icon: <AccountIcon />,
        label: t('account_manage'),
        router: '/account',
      },
      {
        icon: <UserIcon />,
        label: t('user_manage'),
        router: '/setting',
      },
      {
        icon: <StatsIcon />,
        label: t('stats'),
        router: '/stats',
      },
    ],
    [t],
  )

  return (
    <div className="sidebar">
      <div className="py-5 d-flex align-items-center justify-content-center">
        <Logo />
      </div>
      <div className="px-4" role="button">
        {menu.map((item: MenuModel, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="row py-4 sidebar-item" key={index} onClick={() => router.push(item.router)} tabIndex={index} role="button">
            <div className="col-4">{item.icon}</div>
            <div className={`col-8 font-size-14 font-weight-500 sidebar-item-label d-flex align-items-center ${classNames({active: router.pathname === item.router})}`}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
