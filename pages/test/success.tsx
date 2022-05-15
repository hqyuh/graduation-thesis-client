import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import withAuth from '../../hocs/withAuth'
import ExamService from '../../services/exam-service'
import getLayout from '../../shared/getLayout'
import { NextPageWithLayout } from '../_app'

const Index: NextPageWithLayout = () => {
  const [mark, setMark] = useState({})
  const router = useRouter()
  const id = router.query.id
  useEffect(()=> {
    if(id){
      ExamService.saveUserMark({quizzId: id}).then(()=>{
        ExamService.getRecentResult(id).then((res)=> setMark(res.data))
      } )
    }
  }, [id])
  return ( <div className="px-3">
  <div className="card py-5">
    <div className="card-header">
      <h4 className="app-modal-title text-center text-success">Bạn đã hoàn thành bài thi</h4>
    </div>
    <div className="confetti">
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
      <div className="confetti-piece" />
    </div>
    <div className="body">
      <div className="block text-center py-4">
        <p className="card-subtitle">
          Số điểm của bạn là: <span className="text-center font-weight-500 text-success">{mark?.totalNumberOfCorrectAnswers}</span>
        </p>
      </div>
    </div>
  </div>
</div>)
}

const WithTestSuccess = withAuth(Index)

WithTestSuccess.getLayout = getLayout

export default WithTestSuccess
