import { UserAnswersModel } from './../pages/test/[activationCode]';
import { ExamFormModel } from "../components/UpdateSubjectForm/index";
import { ApiResponse, axiosClient } from '../lib/client'
import { ExamModel } from '../models/exam.model'
import { MarkModel } from '../pages/mark-management';
import { UserManagementModel } from '../pages/user-management';

const getAllTopic = (): Promise<ApiResponse<ExamModel[]>> => axiosClient.get('/quizz/list')

const updateQuizz =(quizz: ExamFormModel): Promise<ApiResponse<ExamFormModel>> => axiosClient.patch('/quizz/update',quizz)

const deleteQuizz =(quizzId: string): Promise<unknown> => axiosClient.delete(`/quizz/delete/${quizzId}`)

const createQuizz =(quizz: ExamFormModel): Promise<ApiResponse<ExamFormModel>> => axiosClient.post('/quizz/add',quizz)

const createQuestion =(ques: any): Promise<ApiResponse<any>> => axiosClient.post('/question/add',ques)

const getOneQuizz = (id: string): Promise<ApiResponse<ExamModel>> => axiosClient.get(`quizz/find/${id}`)

const deleteQuestion = (id: string): Promise<ApiResponse<unknown>> => axiosClient.delete(`/question/delete/${id}`)

const updateQuestion = (payload: any): Promise<ApiResponse<unknown>> => axiosClient.patch(`/question/update`, payload)

const getQuizzByCode = (code: string, type: 'find' | 'code' = 'find'): Promise<ApiResponse<ExamModel>> => axiosClient.get(`/quizz/${type}/${code}`)

const saveUserAnswer = (payload: UserAnswersModel[]): Promise<ApiResponse<unknown>> => axiosClient.post(`/user-answer/save-answer`, payload)

const saveUserMark = (payload: {quizzId: string}): Promise<ApiResponse<unknown>> => axiosClient.post(`/user-mark/save`, payload)


const getRecentResult = (quizzId: string): Promise<ApiResponse<{
  "totalNumberOfCorrectAnswers": number,
  "totalNumberOfAnswers": number,
  "totalMark": number
}>> => axiosClient.get(`/correct-answer/show/${quizzId}`)


const getMarkByStudent = (username: string): Promise<ApiResponse<MarkModel[]>> => axiosClient.get(`/user-mark/user/${username}`)

const getMarkByQuizzId = (quizzId: string): Promise<ApiResponse<MarkModel[]>> => axiosClient.get(`/user-mark/quizz/${quizzId}`)

const blockWatchMark = (userId: number, isLocked: boolean): Promise<ApiResponse<unknown>> => axiosClient.get(`/user-mark/${userId}/lock/${isLocked}`)

const getListUser = (): Promise<ApiResponse<UserManagementModel[]>> => axiosClient.get(`/user/list`)


const blockUser = (userId: number, isLocked: boolean): Promise<ApiResponse<unknown>> => axiosClient.get(`/user/${userId}/locked/${isLocked}`)


const ExamService = {
  getAllTopic,
  updateQuizz,
  deleteQuizz,
  createQuizz,
  createQuestion,
  getOneQuizz,
  deleteQuestion,
  updateQuestion,
  getQuizzByCode,
  saveUserAnswer,
  saveUserMark,
  getRecentResult,
  getMarkByStudent,
  getMarkByQuizzId,
  blockWatchMark,
  getListUser,
  blockUser,
}

export default ExamService
