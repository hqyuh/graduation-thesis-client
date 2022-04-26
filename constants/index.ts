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
  '/exam-management/' = 'Quản lý bài thi'
}
