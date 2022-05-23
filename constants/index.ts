const LS_USER_SETTINGS = 'user_settings'

export default LS_USER_SETTINGS

export const YUP_MESSAGE = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter valid email',
} as const

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'

export const NO_AUTHORIZE_PATHNAME = ['/login', '/register']

export enum RESPONSE_TYPE_ENUM {
  'SUCCESS' = 'SUCCESS',
  'ERROR' = 'ERROR',
}

export enum HEADER_TITLE_ENUM {
  '/exam-management' = 'Quản lý đề thi',
  '/exam-management/' = 'Quản lý bài thi',
  '/setting'= 'Quản lý thông tin cá nhân',
  '/user-management' = 'Quản lý tài khoản',
  '/mark-management' = 'Quản lý điểm',
  '/test' = 'Làm bài thi'
}

export enum QUESTION_TYPE {
  'Checkbox' = 'Checkbox',
  'Radio' = 'Radio',
  'Essay' = 'Essay',
}

export const ANSWER_TITLE_ENUM = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
} as const
