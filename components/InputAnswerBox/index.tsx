/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import { Checkbox } from 'primereact/checkbox'
import { InputTextarea } from 'primereact/inputtextarea'
import TrashIcon from '../../icons/TrashIcon'

interface Props {
    index: number
}

const InputAnswerBox: React.FC<Props> = ({index}) => (
  <div className={`col-3 answer-box answer-box-${index}`}>
    <div className="p-1">
    <div className="d-flex align-items-center justify-content-between">
      <span>
        <TrashIcon />
      </span>
      <Checkbox />
    </div>
    <div className="py-2">
      <InputTextarea rows={5} cols={40} placeholder="Nhập câu trả lời..." className={`w-100 rounded-15 answer-insert answer-insert-${index} text-white`} />
    </div>
    </div>
  </div>
)

export default InputAnswerBox
