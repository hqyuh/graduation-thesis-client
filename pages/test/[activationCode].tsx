/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import AnswerContainer from '../../components/AnswerContainer'
import CheckBoxAnswer from '../../components/CheckBoxAnswer'
import EssayAnswer from '../../components/EssayAnswer/indext'
import { QUESTION_TYPE } from '../../constants'
import { useAuth } from '../../context/auth/auth.provider'
import { UserRole } from '../../context/auth/auth.types'
import withAuth from '../../hocs/withAuth'
import { loadFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '../../lib/localStorage'
import { ExamModel, QuestionModel } from '../../models/exam.model'
import ExamService from '../../services/exam-service'
import getLayout from '../../shared/getLayout'
import { data } from '../exam-management/[id]'
import { NextPageWithLayout } from '../_app'

export interface UserAnswersModel {
  quizzId: string,
  questionId: string
  isSelected: string
  shortAnswer: string
  type: keyof typeof QUESTION_TYPE
}


const Index: NextPageWithLayout = () =>{ 
  const [initialQuestion, setInitialQuestion] = useState([])
  const [quizz,setQuizz] = useState<ExamModel>({})
  let timeRef = useRef(null)
  const router = useRouter()
  const { activationCode } = router.query
  const formik = useFormik<{ answers: UserAnswersModel[]}>({
    initialValues: loadFromLocalStorage('answers') || {
      answers: [],
    },
    onSubmit: (values) => {
      ExamService.saveUserAnswer(values.answers).then(()=> {
        router.replace(`/test/success/?id=${quizz?.id}`)
        toast.success('Cám ơn bạn đã tham gia làm bài thi')
        removeFromLocalStorage('answers')
      }).catch(()=> {
        toast.error('Không thể nộp bài thi, đã có lỗi xảy ra')
      })
    },
  })
  useEffect(() => {
    if(activationCode){
      ExamService.getQuizzByCode(activationCode as string, 'code')
      .then((res) => {
        if(res.data.pointBLock === true){
          router.replace('/')
        }
        setQuizz(res.data)
        const newQues = res.data.questions.map((ques: QuestionModel) => {
          const { answerA, answerB, answerC, answerD } = ques
          const answers = [answerA, answerB, answerC, answerD]
          return {
            ...ques,
            answers: answers.map((ans) => ({ content: ans, checked: false })),
          }
        })
        setInitialQuestion(newQues)
        return () => {
          saveToLocalStorage('answers', formik.values)
        }
      })
      .catch(() => {
        // router.replace('/')
        toast.error('Không thể lấy danh sách câu hỏi')
      })
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activationCode])

  useEffect(()=> {
    document.addEventListener('visibilitychange', ()=> {
      if(document.visibilityState === 'hidden'){
        toast.error('Vui lòng quay lại bài thi sau 10s nếu không bạn sẽ bị cấm thi')
       timeRef.current = setTimeout(()=> {
         ExamService.blockTest(quizz.id as number, true).then(()=> {
           toast.error('Bạn đã bị khóa bài thi')
         }).finally(()=> {
          router.replace('/')
         })
       }, 10000)
      } else if(document.visibilityState === 'visible') {
        clearTimeout(timeRef?.current)
      }
    })
    return () => {
      clearTimeout(timeRef.current)
      document.removeEventListener('visibilitychange', console.log)
    }
  },[])
  const {setFieldValue} = formik
  return (
    <div className="p-3">
      {initialQuestion.map((ques, index) => (
        <AnswerContainer content={ques.topicQuestion} index={index} key={ques.id} id={ques.id} type="exam">
          {ques.type === QUESTION_TYPE.Essay ? (
            <EssayAnswer onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setFieldValue(`answers[${index}]`, {quizzId: quizz?.id, questionId: ques.id, shortAnswer: event.target.value, type: ques.type}, false)
            }} />
          ) : (
            <CheckBoxAnswer
              type={ques.type}
              questionId={ques.id}
              quizzId={quizz?.id}
              answerA={ques.answerA}
              answerB={ques.answerB}
              answerC={ques.answerC}
              answerD={ques.answerD}
              index={index}
              setFieldValue={setFieldValue}
              currentFormikValue = {formik.values.answers[index]}
            />
          )}
        </AnswerContainer>
      ))}
      <div className="d-flex justify-content-end mt-3">
        <button type="submit" className="text-white button font-weight-700 btn-primary w-100" onClick={formik.handleSubmit}>Nộp bài</button>
      </div>
    </div>
  )}
  const WithAuthTestPage = withAuth(Index)

  WithAuthTestPage.getLayout = getLayout
  
  export default WithAuthTestPage