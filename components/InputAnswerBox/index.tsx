/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox'
import { InputTextarea } from 'primereact/inputtextarea'
import { FormikHelpers, FormikProps } from 'formik'
import TrashIcon from '../../icons/TrashIcon'
import { QUESTION_TYPE } from '../../constants'
import { CreateQuestionForm } from '../CreateQuestionContainer'

interface Props {
  index: number
  type: Exclude<keyof typeof QUESTION_TYPE, 'Essay'>
  setFieldValue: FormikHelpers<any>['setFieldValue']
  answer: {
    content: string
    checked: boolean
  }
  onTrashClick: (index: number) => void
  formik: FormikProps<CreateQuestionForm>
}

const InputAnswerBox: React.FC<Props & Partial<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, any>>> = ({
  index,
  type,
  answer,
  setFieldValue,
  onTrashClick,
  formik,
  ...props
}) => (
  <div className={`col-3 answer-box answer-box-${index}`}>
    <div className="p-1">
      <div className="d-flex align-items-center justify-content-between">
        <span onClick={()=> onTrashClick(index - 1)} type="button">
          <TrashIcon />
        </span>
        {type === QUESTION_TYPE.Checkbox ? (
          <Checkbox {...props} checked={answer.checked} onChange={(e: CheckboxChangeParams)=> {
            setFieldValue(`answers[${index-1}].checked`, e.target.checked)
          }}/>
        ) : (
          <input checked={answer.checked} type="radio" className="form-check-input" {...props} onChange={
            (e: ChangeEvent<HTMLInputElement>) => {
              const newAnswers = formik.values.answers.map((answer, i) => {
                if(i === index - 1){
                  answer.checked = true
                } else {
                  answer.checked = false
                }
                return answer
              })
              setFieldValue(`answers`, newAnswers, false)
            }
          }/>
        )}
      </div>
      <div className="py-2">
        <InputTextarea
          rows={5}
          cols={40}
          placeholder="Nh???p c??u tr??? l???i..."
          className={`w-100 rounded-15 answer-insert answer-insert-${index} text-white`}
          onChange={   (e: ChangeEvent<HTMLTextAreaElement>) => {
            setFieldValue(`answers[${index-1}].content`, e.target.value)
          }}
          defaultValue={answer.content}
        />
      </div>
    </div>
  </div>
)

export default InputAnswerBox
