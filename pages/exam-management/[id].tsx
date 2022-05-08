import React, { useState } from 'react'
import CreateQuestionContainer, { CreateQuestionForm } from '../../components/CreateQuestionContainer'
import { ANSWER_TITLE_ENUM, QUESTION_TYPE } from '../../constants'
import withAuth from '../../hocs/withAuth'
import getLayout from '../../shared/getLayout'
import { NextPageWithLayout } from '../_app'

const initialValues: CreateQuestionForm = {
  answers: [
    {
      content: '',
      checked: false,
    },
    {
      content: '',
      checked: false,
    },
    {
      content: '',
      checked: false,
    },
    {
      content: '',
      checked: false,
    },
  ],
  topicQuestion: '',
  mark: 0,
}
const Index: NextPageWithLayout = () => {
  const [initQuestion, setInitQuestion] = useState<CreateQuestionForm>(initialValues)
  const onSubmit = (values: CreateQuestionForm) => {
    const mapAnswersToProps = values.answers.reduce((acc, currentAnswer, index) => {
      acc[`answer${ANSWER_TITLE_ENUM[index]}` as any] = currentAnswer.content
      return acc
    }, {})
    const correctResult = values.answers
      .filter((answer, index) => {
        answer.index = index
        return answer.checked === true
      })
      .map((answer) => ANSWER_TITLE_ENUM[answer.index])
      .join(',')
    
    console.log({...values, ... mapAnswersToProps, correctResult})
  }
  return (
    <div>
      <CreateQuestionContainer onSubmit={onSubmit} initialValues={initQuestion} />
    </div>
  )
}

const WithAuthQuizzPage = withAuth(Index)

WithAuthQuizzPage.getLayout = getLayout

export default WithAuthQuizzPage
