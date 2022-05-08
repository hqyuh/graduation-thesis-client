import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea'
import React from 'react'

const InputAnswerArea: React.FC<Partial<InputTextareaProps>> = ({...props}) => (
  <div className="answer-box answer-box-2 d-flex align-items-center justify-content-center py-4 px-4 w-50">
    <InputTextarea
      rows={5}
      cols={40}
      placeholder="Nhập câu trả lời..."
      className="rounded-15 answer-insert answer-insert-2 text-white w-100"
      {...props}
    />
  </div>
)

export default InputAnswerArea
