/* eslint-disable react/self-closing-comp */
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ConfirmExamModal from '../../components/ConfirmExamModal'
import Subject from '../../components/Subject'
import { RESPONSE_TYPE_ENUM } from '../../constants'
import withAuth from '../../hocs/withAuth'
import { ExamModel } from '../../models/exam.model'
import ExamService from '../../services/exam-service'
import getLayout from '../../shared/getLayout'
import { NextPageWithLayout } from '../_app'

const ExamManagementPage: NextPageWithLayout = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [subjects,setSubjects] = useState<ExamModel[]>([])
  useEffect(()=> {
     ExamService.getAllTopic().then((res)=> {
       setSubjects(res.data)
     }).catch((res) => {
       toast.error(res.message)
     })
  }, [])
  return (
    <div className="px-3 py-4">
      {
          subjects?.map((sub) => <Subject key={sub.id} subject={sub} />)
      }
      <ConfirmExamModal isOpen={isOpenModal}>
        {/* <Subject className="subject-bigger pb-2">
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-primary text-white">
              Thực hành
            </button>
          </div>
        </Subject> */}
      </ConfirmExamModal>
    </div>
  )
}

const WithAuthExamManagementPage = withAuth(ExamManagementPage)

WithAuthExamManagementPage.getLayout = getLayout

// export const getServerSideProps: GetServerSideProps = async () => {
    
//     if(response.type === RESPONSE_TYPE_ENUM.ERROR){
//         return {
//             notFound: true,
//         }
//     }
//    return {
//       props: {
//         subjects: response.data,
//       },
//     }
//   }

export default WithAuthExamManagementPage


