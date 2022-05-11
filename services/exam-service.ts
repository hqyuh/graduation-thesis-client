import { ExamFormModel } from "../components/UpdateSubjectForm/index";
import { ApiResponse, axiosClient } from '../lib/client'
import { ExamModel } from '../models/exam.model'

const getAllTopic = (): Promise<ApiResponse<ExamModel[]>> => axiosClient.get('/quizz/list')

const updateQuizz =(quizz: ExamFormModel): Promise<ApiResponse<ExamFormModel>> => axiosClient.patch('/quizz/update',quizz)

const deleteQuizz =(quizzId: string): Promise<unknown> => axiosClient.delete(`/quizz/delete/${quizzId}`)

const createQuizz =(quizz: ExamFormModel): Promise<ApiResponse<ExamFormModel>> => axiosClient.post('/quizz/add',quizz)

const createQuestion =(ques: any): Promise<ApiResponse<any>> => axiosClient.post('/question/add',ques)

const getOneQuizz = (id: string): Promise<ApiResponse<ExamModel>> => axiosClient.get(`/quizz/list/${id}`)

const ExamService = {
  getAllTopic,
  updateQuizz,
  deleteQuizz,
  createQuizz,
  createQuestion,
  getOneQuizz
}

export default ExamService
