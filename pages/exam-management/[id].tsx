import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AnswerContainer from '../../components/AnswerContainer'
import CheckBoxAnswer from '../../components/CheckBoxAnswer'
import CreateQuestionContainer, { CreateQuestionForm } from '../../components/CreateQuestionContainer'
import EssayAnswer from '../../components/EssayAnswer/indext'
import { ANSWER_TITLE_ENUM, QUESTION_TYPE } from '../../constants'
import withAuth from '../../hocs/withAuth'
import { ExamModel, QuestionModel } from '../../models/exam.model'
import ExamService from '../../services/exam-service'
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

export const data = [
  {
    id: 3,
    topicQuestion: 'How can you achieve runtime polymorphism in Java?',
    questionImageUrl: '',
    answerA: 'method overloading',
    answerB: 'method overrunning',
    answerC: 'method overriding',
    answerD: 'method calling',
    correctResult: 'C',
    mark: 2.5,
    milestones: 1,
    dateCreated: '11-04-2022 10:11:33',
    type: 'Checkbox',
  },
  {
    id: 5,
    topicQuestion: 'The runtime system starts your program by calling which function first?',
    questionImageUrl: null,
    answerA: 'print',
    answerB: 'iterative',
    answerC: 'hello',
    answerD: 'main',
    correctResult: 'D',
    mark: 2.5,
    milestones: 1,
    dateCreated: '11-04-2022 10:11:33',
    type: 'Radio',
  },
  {
    id: 78,
    topicQuestion: 'The runtime system starts your program by calling which function first?',
    questionImageUrl: null,
    answerA: null,
    answerB: null,
    answerC: null,
    answerD: null,
    correctResult: null,
    mark: 2.5,
    milestones: 1,
    dateCreated: null,
    type: 'Essay',
  },
]
const Index: NextPageWithLayout = () => {
  const [initQuestion, setInitQuestion] = useState<CreateQuestionForm>(initialValues)
  const [selectedQuizz, setSelectedQuizz] = useState<ExamModel>({} as ExamModel)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [initialQuestion, setInialQuestion] = useState([initialValues])
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    ExamService.getOneQuizz(id as string)
      .then((res) => {
        setSelectedQuizz(res.data)
        const newQues = res.data?.questions.map((ques: QuestionModel) => {
          const { answerA, answerB, answerC, answerD } = ques
          const answers = [answerA, answerB, answerC, answerD]
          return {
            ...ques,
            answers: answers.map((ans) => ({ content: ans, checked: false })),
          }
        })
        console.log(newQues)
        setInialQuestion(newQues)
      })
      .catch(() => toast.error('Không thể lấy danh sách câu hỏi'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
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
    if(isUpdating === true ) {
      delete values.answers
      ExamService.updateQuestion({ ...values, ...mapAnswersToProps, correctResult, quizzId: id })
      .then(() => {
        toast.success('Cập nhât câu hỏi thành công')
        setIsUpdating(false)
      })
      .catch(() => toast.error('Cập nhât hỏi thất bại!'))
    }
    else {
      ExamService.createQuestion({ ...values, ...mapAnswersToProps, correctResult, id })
      .then(() => {
        toast.success('Tạo câu hỏi thành công')
      })
      .catch(() => toast.error('Tạo câu hỏi thất bại!'))
    }
  }
  return (
    <div>
      {initialQuestion.map((ques, index) => (
        <AnswerContainer content={ques.topicQuestion} index={index} key={ques.id} id={ques.id} onUpdateClick={() => {
          setInitQuestion(ques)
          setIsUpdating(true)
        }}>
          {ques.type === QUESTION_TYPE.Essay ? (
            <EssayAnswer />
          ) : (
            <CheckBoxAnswer
              type={ques.type}
              answerA={ques.answerA}
              answerB={ques.answerB}
              answerC={ques.answerC}
              answerD={ques.answerD}
            />
          )}
        </AnswerContainer>
      ))}
      <CreateQuestionContainer onSubmit={onSubmit} initialValues={initQuestion} />
    </div>
  )
}

const WithAuthQuizzPage = withAuth(Index)

WithAuthQuizzPage.getLayout = getLayout

export default WithAuthQuizzPage
