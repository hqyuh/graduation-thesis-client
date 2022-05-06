import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import React, { SyntheticEvent } from 'react'
import CrossIcon from '../../icons/CrossIcon'
import SettingIcon from '../../icons/SettingIcon'
import SubjectLg from '../../icons/SubjectLg'
import TrashIcon from '../../icons/TrashIcon'
import { ExamModel } from '../../models/exam.model'
import InputWrapper from '../InputText'

export type ExamFormModel = Omit<ExamModel, 'question' | 'activationCode' | 'dateCreated'>

export interface ExamFormEvent {
  onDeleteClick: (id: string) => void
  onSettingClick: (sub: ExamFormModel & ExamModel) => void
}

interface Props {
  onSubmit: (values: ExamFormModel) => void
  initialValues: ExamFormModel
}

const UpdateSubjectForm: React.FC<Props & ExamFormEvent> = ({
  onSubmit,
  initialValues,
  onDeleteClick,
  onSettingClick,
}) => {
  const formik = useFormik<ExamFormModel>({
    initialValues,
    onSubmit,
  })

  const { handleChange } = formik

  const stopDefaultEvent = (event: SyntheticEvent) => {
    event.stopPropagation()
  }
  return (
    <div className="subject-update">
      <SubjectLg />
      {Object.keys(initialValues).length !== 0 && (
        <TrashIcon
          className="trash-icon"
          onClick={(event: SyntheticEvent) => {
            stopDefaultEvent(event)
            onDeleteClick(initialValues.id || '')
          }}
        />
      )}
      <CrossIcon
        className="setting-icon"
        onClick={(event: SyntheticEvent) => {
          stopDefaultEvent(event)
          onSettingClick(formik.values as any)
        }}
      />

      <span className="btn btn-grey subject-question-number">{4}&nbsp;Q</span>
      <span className="btn btn-grey subject-draft">Bản thảo</span>
      <div className="row px-2">
        <div className="col-6 mt-3">
          <InputWrapper
            label=""
            formik={formik}
            className="text"
            placeholder="Tên đề thi"
            onChange={handleChange}
            name="testName"
            value={formik.values?.testName}
          />
        </div>
        <div className="col-6 mt-3">
          <Calendar
            timeOnly
            showTime
            hourFormat="24"
            inputClassName="text"
            placeholder="Thời gian thi"
            onChange={handleChange}
            name="examTime"
            value={(formik.values.examTime as Date) || new Date()}
          />
        </div>
        <div className="col-6 mt-3">
          <Calendar
            id="touchUI"
            placeholder="Ngày bắt đầu"
            touchUI
            inputClassName="text"
            onChange={handleChange}
            name="isStart"
            value={new Date(formik.values?.isStart)}
          />
        </div>
        <div className="col-6 mt-3">
          <Calendar
            id="touchUI"
            placeholder="Ngày kết thúc"
            touchUI
            inputClassName="text"
            onChange={handleChange}
            name="isEnd"
            value={new Date(formik.values?.isEnd)}
          />
        </div>
        <div className="col-12 mt-3 d-flex justify-content-center">
          <Button label="Save" className="p-button-help button w-50 font-weight-700" />
        </div>
      </div>
    </div>
  )
}

export default UpdateSubjectForm
