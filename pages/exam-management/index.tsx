/* eslint-disable react/self-closing-comp */
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ConfirmExamModal from '../../components/ConfirmExamModal'
import Subject from '../../components/Subject'
import UpdateSubjectForm, { ExamFormModel } from '../../components/UpdateSubjectForm'
import withAuth from '../../hocs/withAuth'
import useToggle from '../../hooks/useToggle'
import { ExamModel } from '../../models/exam.model'
import ExamService from '../../services/exam-service'
import getLayout from '../../shared/getLayout'
import { NextPageWithLayout } from '../_app'

const data = [
  {
    id: '',
    testName: 'abc',
    dateCreated: new Date(),
    examTime: new Date(),
    isStart: new Date(),
    isEnd: new Date(),
    activationCode: '',
    question: [],
  },
]

const ExamManagementPage: NextPageWithLayout = () => {
  const { toggle: toggleUpdate, value: isUpdateOpen } = useToggle(false)
  const { toggle: toggleCreate, value: isCreateOpen } = useToggle(false)
  const { toggle, value } = useToggle(false)
  const [selectedSubject, setSelectedSubject] = useState<ExamModel>({} as ExamModel)
  const [subjects, setSubjects] = useState<ExamModel[]>([])
  const [updateSubject, setUpdateSubject] = useState({})
  useEffect(() => {
    ExamService.getAllTopic()
      .then((res) => {
        setSubjects(res.data)
      })
      .catch((res) => {
        toast.error(res.message)
      })
  }, [])

  const onDeleteClick = (id: string) => {
    confirmDialog({
      message: 'Bạn có muốn xóa đề thi?',
      header: 'Xóa đề thi',
      icon: 'pi pi-exclamation-triangle',
      accept: console.log,
      reject: console.log,
      acceptLabel: 'Có',
      rejectLabel: 'Không',
      acceptClassName: 'p-button-danger',
    })
  }
  return (
    <div className="pb-3 pt-1 py-4">
      <Button label="Tạo đề thi" className="p-button-success my-2" onClick={toggleCreate} />
      {data?.map((sub) => (
        <Subject
          key={sub.id}
          subject={sub}
          onClick={(e) => {
            toggle()
            setSelectedSubject(sub)
          }}
          onDeleteClick={onDeleteClick}
          onSettingClick={() => {
            setUpdateSubject(sub)
            toggleUpdate()
          }}
        />
      ))}
      <ConfirmExamModal isOpen={isUpdateOpen}>
        <UpdateSubjectForm
          onSubmit={console.log}
          initialValues={updateSubject as ExamFormModel}
          onSettingClick={() => toggleUpdate()}
          onDeleteClick={onDeleteClick}
        />
      </ConfirmExamModal>
      <ConfirmExamModal isOpen={isCreateOpen}>
        <UpdateSubjectForm
          onSubmit={console.log}
          initialValues={{} as ExamFormModel}
          onSettingClick={() => toggleCreate()}
          onDeleteClick={onDeleteClick}
        />
      </ConfirmExamModal>
      <ConfirmExamModal isOpen={value}>
        <Subject className="subject-bigger pb-2" subject={selectedSubject} onSettingClick={toggle}>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <button type="button" className="btn btn-primary text-white w-50">
              Thực hành
            </button>
            <button type="button" className="btn btn-primary text-white w-50 mt-2">
              Tạo câu hỏi
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
