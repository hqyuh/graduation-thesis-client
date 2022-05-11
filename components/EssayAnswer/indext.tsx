import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'

const EssayAnswer: React.FC = () => (
    <InputTextarea
    rows={5}
    cols={40}
    placeholder="Nhập câu trả lời..."
    className="rounded-15 w-100 m-auto"
  />
)

export default EssayAnswer