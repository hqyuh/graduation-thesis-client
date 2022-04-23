import { ApiResponse, axiosClient } from '../lib/client'
import { ExamModel } from '../models/exam.model'

const getAllTopic = (): Promise<ApiResponse<ExamModel[]>> => axiosClient.get('/topic/list')

const ExamService = {
  getAllTopic,
}

export default ExamService
