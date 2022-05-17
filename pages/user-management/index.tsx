import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { toast } from 'react-toastify'
import { Column } from 'primereact/column'
import { useRouter } from 'next/router'
import withAuth from '../../hocs/withAuth'
import getLayout from '../../shared/getLayout'
import { NextPageWithLayout } from '../_app'
import { useAuth } from '../../context/auth/auth.provider'
import { UserRole } from '../../context/auth/auth.types'
import { InputSwitch, InputSwitchChangeParams } from 'primereact/inputswitch'
// eslint-disable-next-line import/no-cycle
import ExamService from '../../services/exam-service'

   
  export type UserAuthorities = ['user:create', 'user:delete', 'user:read', 'user:update']

export interface UserManagementModel {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  phoneNumber: string | null
  dateOfBirth: null
  profileImageUrl: string
  lastLogin: string
  lastLoginDateDisplay: string
  joinDate: string
  roles: keyof typeof UserRole
  authorities: UserAuthorities
  authType: null
  notLocked: boolean
  active: boolean
}


const Index: NextPageWithLayout = () => {
  const [users, setUsers] = useState<UserManagementModel[]>([])
  const router = useRouter()
  const { currentUser } = useAuth()
  useEffect(() => {
      console.log(currentUser)
      if (currentUser?.roles === UserRole.ROLE_ADMIN) {
        ExamService.getListUser().then((res) => {
          setUsers(res.data)
        })
    } else {
        // router.replace('/home')
    }
  }, [currentUser])
  const cols = [
    {
      field: 'username',
      header: 'Username',
    },
    {
      field: 'email',
      header: 'Email',
    },
    {
      field: 'roles',
      header: 'Loại',
    },
    {
      field: 'lastLogin',
      header: 'Lần cuối đăng nhập',
    },
  ]
  return (
    <div className="px-3">
      <DataTable
        value={users}
        responsiveLayout="scroll"
        paginator
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
        {cols.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} sortField={col.field} sortable filter />
        ))}
        <Column
          header="Quyền"
          body={
            (rowData: UserManagementModel) => (<>
              <span>Block</span>
              <InputSwitch onChange={(e: InputSwitchChangeParams) => {
                ExamService.blockUser(rowData.id, e.target.value).then(() => {
                  toast.success(`Đã khóa ${rowData.username}`)
                }).catch(()=> {
                  toast.error(`Khóa ${rowData.username} thất bại`)
                })
              }}/>
              <span>Allow</span>
            </>
)          }
        />
      </DataTable>
    </div>
  )
}

const withAuthMarkManagementPage = withAuth(Index)

withAuthMarkManagementPage.getLayout = getLayout

export default withAuthMarkManagementPage
