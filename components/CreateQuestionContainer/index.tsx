/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea'
import { FormikHelpers, useFormik } from 'formik'
import Pencil from '../../icons/Pencil'
import InputAnswerBox from '../InputAnswerBox'
import InputAnswerArea from '../InputAnswerArea'
import { QUESTION_TYPE } from '../../constants'

const cities = [
  { name: 'Checkbox', code: '0' },
  { name: 'Radio', code: '1' },
  { name: 'Essay', code: '2' },
]

interface Props {
  initialValues: any
  onSubmit: (values: any, helpers: FormikHelpers<any>) => void
}

export type CreateQuestionForm = {
  answers: {content: string, checked: boolean}[],
  topicQuestion: string
  mark: 0,
  type?: keyof typeof QUESTION_TYPE
  content?: string
  id: string
}

const CreateQuestionContainer: React.FC<Props> = ({ initialValues, onSubmit }) => {
  console.log(initialValues)
  const [questionType, setQuestionType] = useState<keyof typeof QUESTION_TYPE>(QUESTION_TYPE.Checkbox)
  const formik = useFormik<CreateQuestionForm>({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      type: questionType,
    },
    onSubmit,
  })
  const { handleChange, setFieldValue } = formik
  const onTrashClick = (index: number): void => {
    if (formik.values.answers.length !== 2) {
      const newAnswers = formik.values.answers.filter((_, i) => i !== index)
      setFieldValue('answers', newAnswers, false)
    }
  }
  const addAnswer = (): void => {
    const newAnswers = formik.values?.answers.concat({
      content: '',
      checked: false,
    })
    setFieldValue('answers', newAnswers, false)
  }
  return (
    <>
      <div className="bg py-4 px-3 create-question-container h-75">
        <div className="create-question d-flex justify-content-center align-items-center position-relative">
          <div className="dropdown">
            <Dropdown
              optionLabel="name"
              optionValue="name"
              value={formik.values.type || questionType}
              options={cities}
              onChange={(e) => setQuestionType(e.value as any)}
              className="custom"
            />
          </div>
          <div className="d-flex align-items-center">
            <p className="font-weight-800 font-size-16 text-center text-white mb-0 mr-2">Nền tảng hệ thống</p>
            &nbsp; &nbsp;
            <Pencil />
          </div>
        </div>
        <div className="px-5 my-3 w-100">
          <InputTextarea
            rows={5}
            cols={30}
            placeholder="Nhập câu hỏi của bạn..."
            className="w-100 rounded-15 bg-white question-insert"
            name="topicQuestion"
            onChange={handleChange}
            value={formik.values.topicQuestion}
          />
        </div>
        <div className="row my-2 justify-content-center">
          {questionType !== QUESTION_TYPE.Essay &&
            formik.values.answers?.map((answer, index) => (
              <InputAnswerBox
                key={index + 'a'}
                index={index + 1}
                type={questionType}
                name="checkbox"
                setFieldValue={setFieldValue}
                answer={answer}
                onTrashClick={onTrashClick}
                formik={formik}
              />
            ))}
          {questionType !== QUESTION_TYPE.Essay && formik.values?.answers?.length < 4 && (
            <div
              className="add-answer d-flex align-items-center justify-content-center cursor-pointer"
              onClick={addAnswer}>
              <div className="answer-insert-2 rounded-15 p-3 font-weight-700 text-white font-size-16 h-75 w-75 d-flex align-items-center justify-content-center">
                Thêm câu hỏi
              </div>
            </div>
          )}
          {questionType === QUESTION_TYPE.Essay && <InputAnswerArea nane="correctEssay" onChange={handleChange as any} />}
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end mt-2">
        <button className="btn btn-secondary font-weight-700 rounded-15" type="button">
          Hủy
        </button>
        <button
          className="btn btn-primary font-weight-700 text-white rounded-15 ms-3"
          type="button"
          onClick={formik.handleSubmit}>
          Lưu
        </button>
      </div>
    </>
  )
}

export default CreateQuestionContainer
