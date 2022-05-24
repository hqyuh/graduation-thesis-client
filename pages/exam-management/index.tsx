/* eslint-disable react/self-closing-comp */
import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ConfirmExamModal from '../../components/ConfirmExamModal'
import Subject from '../../components/Subject'
import UpdateSubjectForm, { ExamFormModel } from '../../components/UpdateSubjectForm'
import { useAuth } from '../../context/auth/auth.provider'
import { UserRole } from '../../context/auth/auth.types'
import withAuth from '../../hocs/withAuth'
import useCopyToClipboard from '../../hooks/useCopyToClipBoard'
import useToggle from '../../hooks/useToggle'
import { ExamModel } from '../../models/exam.model'
import ExamService from '../../services/exam-service'
import getLayout from '../../shared/getLayout'
import { NextPageWithLayout } from '../_app'

export const data = [
  {
    id: 'e',
    testName: 'abc',
    dateCreated: new Date(),
    examTime: 234234,
    isStart: new Date(),
    isEnd: new Date(),
    activationCode: '',
    questions: [],
    topicId: 0,
    currentTestName: 'abc',
  },
  {
    id: 'abc',
    testName: 'abc',
    dateCreated: new Date(),
    examTime: 234234,
    isStart: new Date(),
    isEnd: new Date(),
    activationCode: '',
    questions: [],
    topicId: 0,
    currentTestName: 'abc',
  },
]

export const convertSubmitTime = (time: Moment): string => moment(time).format('DD/MM/YYYY')

const ExamManagementPage: NextPageWithLayout = () => {
  const { toggle: toggleUpdate, value: isUpdateOpen } = useToggle(false)
  const { toggle: toggleCreate, value: isCreateOpen } = useToggle(false)
  const { toggle, value } = useToggle(false)
  const {currentUser} = useAuth()
  const [selectedSubject, setSelectedSubject] = useState<ExamModel>({} as ExamModel)
  const [subjects, setSubjects] = useState<ExamModel[]>([])
  const [updateSubject, setUpdateSubject] = useState({})
  const [copyValue, copy] = useCopyToClipboard()
  const router = useRouter()
  useEffect(() => {
    if(currentUser?.roles === UserRole.ROLE_USER){
      toast.error('Bạn không có quyền truy cập trang này')
    } else {
      ExamService.getAllTopic()
      .then((res) => {
        setSubjects(res.data)
      })
      .catch((res) => {
        toast.error(res.message)
      })
    }
  }, [currentUser])

  const onDeleteClick = (id: string) => {
    confirmDialog({
      message: 'Bạn có muốn xóa đề thi?',
      header: 'Xóa đề thi',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        ExamService.deleteQuizz(id)
          .then(() => {
            toast.success('Xóa thành công')
          })
          .then(() => toast.error('Xóa thất bại'))
      },
      reject: console.log,
      acceptLabel: 'Có',
      rejectLabel: 'Không',
      acceptClassName: 'p-button-danger',
    })
  }

  const handleUpdateQuizz = (values: ExamFormModel): void => {
    delete values.questions
    delete values.dateCreated
    ExamService.updateQuizz({
      ...values,
      examTime: moment(values.examTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds'),
      isEnd: convertSubmitTime(values.isEnd),
      isStart: convertSubmitTime(values.isStart),
    })
      .then(() => {
        toast.success('Cật nhật đề thi thành công')
      })
      .catch(() => {
        toast.error('Cập nhật bài thi thất bại!')
      })
      .finally(toggleUpdate)
  }

  const handleCreateQuizz = (values: ExamFormModel): void => {
    ExamService.createQuizz({
      ...values,
      examTime: moment(values.examTime, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds'),
      isEnd: convertSubmitTime(values.isEnd),
      isStart: convertSubmitTime(values.isStart),
    })
      .then(() => {
        toast.success('Tạo đề thi thành công')
      })
      .catch(() => {
        toast.error('Tạo đề thi thất bại')
      })
      .finally(toggleCreate)
  }
  return (
    <div className="pb-3 pt-1 py-4">
      <Button label="Tạo đề thi" className="p-button-success my-2" onClick={toggleCreate} />
      <div className="d-flex flex-wrap">
      {subjects?.map((sub) => (
        <Subject
          key={sub.id}
          subject={sub}
          onClick={() => {
            toggle()
            setSelectedSubject(sub)
          }}
          className="mx-3"
          onDeleteClick={onDeleteClick}
          onSettingClick={() => {
            setUpdateSubject(sub)
            toggleUpdate()
          }}
        />
      ))}
      </div>
      <ConfirmExamModal isOpen={isUpdateOpen}>
        <UpdateSubjectForm
          onSubmit={handleUpdateQuizz}
          initialValues={updateSubject as ExamFormModel}
          onSettingClick={() => toggleUpdate()}
          onDeleteClick={onDeleteClick}
        />
      </ConfirmExamModal>
      <ConfirmExamModal isOpen={isCreateOpen}>
        <UpdateSubjectForm
          onSubmit={handleCreateQuizz}
          initialValues={{} as ExamFormModel}
          onSettingClick={() => toggleCreate()}
          onDeleteClick={onDeleteClick}
        />
      </ConfirmExamModal>
      <ConfirmExamModal isOpen={value}>
        <Subject
          className="subject-bigger pb-2"
          subject={selectedSubject}
          onSettingClick={toggle}
          onDeleteClick={console.log}>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <button type="button" className="btn btn-primary text-white w-50" onClick={() => {
              router.push(`/test/${selectedSubject.activationCode}`)
            }}>
              Thực hành
            </button>
            <button type="button" className="btn btn-primary text-white w-50 mt-2" onClick={()=> {
              router.push(`/exam-management/${selectedSubject.id || 'not-found'}`)
            }}>
              Tạo câu hỏi
            </button>
            <button type="button" className="btn btn-primary text-white w-50 mt-2" onClick={()=> {
              router.push(`/mark-management/?id=${selectedSubject.id || 'not-found'}`)
            }}>
              Xem điểm
            </button>
            <button type="button" className="btn btn-primary text-white w-50 mt-2" onClick={()=> {
              copy(selectedSubject.activationCode)
            }}>
              Lấy mã 
            </button>
          </div>
        </Subject>
      </ConfirmExamModal>
    </div>
  )
}

const WithAuthExamManagementPage = withAuth(ExamManagementPage)

WithAuthExamManagementPage.getLayout = getLayout

export default WithAuthExamManagementPage
