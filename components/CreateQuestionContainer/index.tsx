import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import Pencil from '../../icons/Pencil'
import { InputTextarea } from 'primereact/inputtextarea'
import InputAnswerBox from '../InputAnswerBox'

const cities = [
  { name: 'Checkbox', code: '0' },
  { name: 'Radio', code: '1' },
  { name: 'Tự luận', code: '2' },
]

const CreateQuestionContainer: React.FC = () => {
  const [questionType, setQuestionType] = useState()
  return (
    <div className="bg py-4 px-3">
      <div className="create-question d-flex justify-content-center align-items-center position-relative">
        <div className="dropdown">
          <Dropdown
            optionLabel="name"
            optionValue="code"
            value={questionType || 'Checkbox'}
            options={cities}
            onChange={(e) => setQuestionType(e.value as any)}
            className="custom"
          />
        </div>
        <div className="d-flex align-items-center">
          <p className="font-weight-800 font-size-16 text-center text-white mb-0 mr-2">Nền tảng hệ thống</p>
          &nbsp;
          &nbsp;
          <Pencil />
        </div>
      </div>
      <div className="px-5 my-3 w-100">
        <InputTextarea rows={5} cols={30} placeholder="Nhập câu hỏi của bạn..." className="w-100 rounded-15 bg-white question-insert" />
      </div>
      <div className="row my-2 justify-content-center">
          {
              [1,2,3,4].map((index) => (<InputAnswerBox key={index} index={index}/>))
          }
      </div>
    </div>
  )
}

export default CreateQuestionContainer
