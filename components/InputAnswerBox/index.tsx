/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox'
import { InputTextarea } from 'primereact/inputtextarea'
import { FormikHelpers } from 'formik'
import TrashIcon from '../../icons/TrashIcon'
import { QUESTION_TYPE } from '../../constants'

interface Props {
  index: number
  type: Exclude<keyof typeof QUESTION_TYPE, 'Essay'>
  setFieldValue: FormikHelpers<any>['setFieldValue']
  answer: {
    content: string
    checked: boolean
  }
  onTrashClick: (index: number) => void
}

const InputAnswerBox: React.FC<Props & Partial<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, any>>> = ({
  index,
  type,
  answer,
  setFieldValue,
  onTrashClick,
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
              setFieldValue(`answers[${index-1}].checked`, e.target.checked)
            }
          }/>
        )}
      </div>
      <div className="py-2">
        <InputTextarea
          rows={5}
          cols={40}
          placeholder="Nhập câu trả lời..."
          className={`w-100 rounded-15 answer-insert answer-insert-${index} text-white`}
          onChange={   (e: ChangeEvent<HTMLTextAreaElement>) => {
            setFieldValue(`answers[${index-1}].content`, e.target.value)
          }}
        />
      </div>
    </div>
  </div>
)

export default InputAnswerBox
