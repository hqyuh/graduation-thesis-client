import { ExamFormModel } from "../components/UpdateSubjectForm/index";
import { ApiResponse, axiosClient } from '../lib/client'
import { ExamModel } from '../models/exam.model'

const getAllTopic = (): Promise<ApiResponse<ExamModel[]>> => axiosClient.get('/quizz/list')

const updateQuizz =(quizz: ExamFormModel): Promise<ApiResponse<ExamFormModel>> => axiosClient.patch('/quizz/update',quizz)

const deleteQuizz =(quizzId: string): Promise<unknown> => axiosClient.delete(`/quizz/delete/${quizzId}`)

const createQuizz =(quizz: ExamFormModel): Promise<ApiResponse<ExamFormModel>> => axiosClient.post('/quizz/add',quizz)

const ExamService = {
  getAllTopic,
  updateQuizz,
  deleteQuizz,
  createQuizz
}

export default ExamService
