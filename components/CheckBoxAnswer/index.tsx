import { Checkbox } from 'primereact/checkbox'
import React, { useMemo, useState } from 'react'
import { QUESTION_TYPE } from '../../constants'

type AnswerString = 'answer'

type AnswersResUnion = 'A' | 'B' | 'C' | 'D'

type AnswersResponse = `${AnswerString}${AnswersResUnion}`

export type AnswersResponseTuple = {
  [K in AnswersResponse]: string
}

interface Props extends AnswersResponseTuple {
  type: Exclude<keyof typeof QUESTION_TYPE, 'Essay'>
}

const CheckBoxAnswer: React.FC<Props> = ({ type, answerA, answerB, answerC, answerD }) => {
  const [state, setState] = useState()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const answers = useMemo(() => [answerA, answerB, answerC, answerD], [])
  return (
    <div className="row">
      {answers.map((answer, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="col-6 d-flex align-items-center py-3" key={index}>
          {QUESTION_TYPE.Checkbox === type ? <Checkbox /> : <input className="form-check-input" type="radio"/>}
          <div className="mx-2">{answer}</div>
        </div>
      ))}
    </div>
  )
}

export default CheckBoxAnswer
