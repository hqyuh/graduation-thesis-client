import { useRouter } from 'next/router'
import React, { useState } from 'react'
import AnswerContainer from '../../components/AnswerContainer'
import CheckBoxAnswer from '../../components/CheckBoxAnswer'
import CreateQuestionContainer, { CreateQuestionForm } from '../../components/CreateQuestionContainer'
import EssayAnswer from '../../components/EssayAnswer/indext'
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
  const router = useRouter()
  const {id } = router.query
  const onSubmit = (values: CreateQuestionForm) => {
    const mapAnswersToProps = values.answers.reduce((acc, currentAnswer, index) => {
      acc[`answer${ANSWER_TITLE_ENUM[index]}` as string] = currentAnswer.content
      return acc
    }, {})
    const correctResult = values.answers
      .filter((answer, index) => {
        answer.index = index
        return answer.checked === true
      })
      .map((answer) => ANSWER_TITLE_ENUM[answer.index])
      .join(',')

    console.log({ ...values, ...mapAnswersToProps, correctResult, id })
  }
  const dummyAnswer = {
    answerA: 'Câu a',
    answerB: 'Câu a',
    answerC: 'Câu a',
    answerD: 'Câu a',
  }
  return (
    <div>
      <AnswerContainer content="hỏi gì" index={2}>
        <CheckBoxAnswer type="Checkbox" {...dummyAnswer} />
      </AnswerContainer>
      <AnswerContainer content="hỏi gì" index={2}>
        <EssayAnswer/>
      </AnswerContainer>
      <AnswerContainer content="hỏi gì" index={2}>
        <CheckBoxAnswer type="Radio" {...dummyAnswer} />
      </AnswerContainer>
      <CreateQuestionContainer onSubmit={onSubmit} initialValues={initQuestion} />
    </div>
  )
}

const WithAuthQuizzPage = withAuth(Index)

WithAuthQuizzPage.getLayout = getLayout

export default WithAuthQuizzPage
