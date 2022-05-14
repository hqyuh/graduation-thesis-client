import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea'
import React from 'react'



const EssayAnswer: React.FC<InputTextareaProps> = (props) => (
    <InputTextarea
    rows={5}
    cols={40}
    placeholder="Nhập câu trả lời..."
    className="rounded-15 w-100 m-auto"
    {...props}
  />
)

export default EssayAnswer