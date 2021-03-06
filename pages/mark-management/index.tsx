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

export interface MarkModel {
  id: number
  mark: number
  completedDate: string
  quizzName: string
  username: string
  userId: number
  quizzId: number
  point_lock: boolean
}

const Index: NextPageWithLayout = () => {
  const [marks, setMarks] = useState<MarkModel[]>([])
  const router = useRouter()
  const { currentUser } = useAuth()
  const { id } = router.query
  useEffect(() => {
    if (!id) {
      if (currentUser?.roles === UserRole.ROLE_USER) {
        ExamService.getMarkByStudent(currentUser.username).then((res) => {
          setMarks(res.data)
        })
      }
    } else {
      ExamService.getMarkByQuizzId(id)
        .then((res) => {
          setMarks(res.data)
        })
        .catch((res) => toast.error(res.message))
    }
  }, [id, currentUser])
  const cols = [
    {
      field: 'username',
      header: 'Username',
    },
    {
      field: 'quizzName',
      header: 'Bài thi',
    },
    {
      field: 'mark',
      header: 'Điểm',
    },
    {
      field: 'completedDate',
      header: 'Hoàn thành',
    },
  ]
  return (
    <div className="px-3">
      <DataTable
        value={marks}
        responsiveLayout="scroll"
        paginator
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
        {cols.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} sortField={col.field} sortable filter />
        ))}
        {currentUser?.roles !== UserRole.ROLE_USER && (
          <Column
            header="Xem điểm"
            body={(rowData: MarkModel) => (
              <>
                <span>Block</span>
                <InputSwitch
                  onChange={(e: InputSwitchChangeParams) => {
                    ExamService.blockWatchMark(rowData.userId, e.target.value)
                      .then(() => {
                        toast.success(`Đã khóa quyền xem điểm của ${rowData.username}`)
                        ExamService.getMarkByStudent(currentUser.username).then((res) => {
                          setMarks(res.data)
                        })
                      })
                      .catch(() => {
                        toast.error(`Khóa quyền xem điểm của ${rowData.username} thất bại`)
                      })
                  }}
                  checked={rowData.point_lock}
                />
                <span>Allow</span>
              </>
            )}
          />
        )}
      </DataTable>
    </div>
  )
}

const withAuthMarkManagementPage = withAuth(Index)

withAuthMarkManagementPage.getLayout = getLayout

export default withAuthMarkManagementPage
