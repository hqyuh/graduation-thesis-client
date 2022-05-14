import { FormikHelpers } from 'formik'
import { Checkbox } from 'primereact/checkbox'
import React, { ChangeEvent, useMemo, useState } from 'react'
import { ANSWER_TITLE_ENUM, QUESTION_TYPE } from '../../constants'
import { UserAnswersModel } from '../../pages/test/[activationCode]'

type AnswerString = 'answer'

type AnswersResUnion = 'A' | 'B' | 'C' | 'D'

type AnswersResponse = `${AnswerString}${AnswersResUnion}`

export type AnswersResponseTuple = {
  [K in AnswersResponse]: string
}

interface Props extends AnswersResponseTuple {
  type: Exclude<keyof typeof QUESTION_TYPE, 'Essay'>
  index: number
  quizzId: string
  setFieldValue: FormikHelpers<any>['setFieldValue']
  questionId: string
  currentFormikValue: UserAnswersModel
}

type answerIndexUnion = 0 | 1 | 2 | 3

const CheckBoxAnswer: React.FC<Props> = ({ type, answerA, answerB, answerC, answerD, index, quizzId, setFieldValue, questionId, currentFormikValue }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const answers = useMemo(() => [answerA, answerB, answerC, answerD], [])
  const onAnswerChange = (checkboxIndex: answerIndexUnion) => (event: ChangeEvent<HTMLInputElement>) => {
    let isSelected = '';
    const answerTitle = ANSWER_TITLE_ENUM[checkboxIndex]
    if(type === QUESTION_TYPE.Checkbox){
      if(!(currentFormikValue?.isSelected || '').split(',').find(title => title === answerTitle)){
        if(event.target.checked === true) {
          isSelected = `${(currentFormikValue?.isSelected || '')},${answerTitle}`
        }else if(event.target.checked === false){
          isSelected = (currentFormikValue?.isSelected || '').split(',').filter((title) => title !== answerTitle).join(',').replace(',', '')
        }
      }
    } else if(type === QUESTION_TYPE.Radio){
      isSelected = answerTitle
    }
    setFieldValue(`answers[${index}]`, {quizzId, questionId, isSelected, type}, false)
  }
  return (
    <div className="row">
      {answers.map((answer, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="col-6 d-flex align-items-center py-3" key={i}>
          <input className="form-check-input" type={type} name={`radio-${index}`} onChange={onAnswerChange(i as answerIndexUnion )}/>
          <div className="mx-2">{answer}</div>
        </div>
      ))}
    </div>
  )
}

export default CheckBoxAnswer
