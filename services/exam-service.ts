import { ApiResponse, axiosClient } from '../lib/client'
import { ExamModel } from '../models/exam.model'

const getAllTopic = (): Promise<ApiResponse<ExamModel[]>> => axiosClient.get('/quizz/list')

const ExamService = {
  getAllTopic,
}

export default ExamService
