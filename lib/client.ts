import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ACCESS_TOKEN_KEY, NO_AUTHORIZE_PATHNAME } from '../constants/index'
import { loadFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from './localStorage'

export const ResponseMessage = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
} as const

export type MessageKey = keyof typeof ResponseMessage

export interface ApiResponse<T = any> {
  type: MessageKey
  message: string
  data: T
  status?: number
}

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TEXT_API_URL,
})

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const tokenOnStore = typeof window !== 'undefined' ? loadFromLocalStorage(ACCESS_TOKEN_KEY) : ''
  if (
    typeof window !== 'undefined' &&
    !NO_AUTHORIZE_PATHNAME.includes(window?.location.pathname) &&
    config.headers !== undefined &&
    tokenOnStore
  ) {
    config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJVc2VyIE1hbmFnZW1lbnQgUG9ydGFsLiIsInN1YiI6InF1YW5naHV5IiwiaXNzIjoiQU1CSVRJT1VTIE1FTiIsIkF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiZXhwIjoxNjUxMTE2MTAwLCJpYXQiOjE2NTA2ODQxMDB9.BZvFGgmK-9q5x8cbb5yZLUiu_nsIXx3ehlfB2gaU-h4H-9GhtXU737RAKgVa4SplNJ0gEp66QDORfKjjgH1_5Q`
  }
  config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJVc2VyIE1hbmFnZW1lbnQgUG9ydGFsLiIsInN1YiI6InF1YW5naHV5IiwiaXNzIjoiQU1CSVRJT1VTIE1FTiIsIkF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiZXhwIjoxNjUxMTE2MTAwLCJpYXQiOjE2NTA2ODQxMDB9.BZvFGgmK-9q5x8cbb5yZLUiu_nsIXx3ehlfB2gaU-h4H-9GhtXU737RAKgVa4SplNJ0gEp66QDORfKjjgH1_5Q`
  return config
})

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && response.data.type === ResponseMessage.ERROR) {
      return Promise.reject(response.data)
    }
    const responseToken = response.headers.authorization
    if (responseToken && typeof window !== 'undefined') {
      saveToLocalStorage(ACCESS_TOKEN_KEY, responseToken)
    }
    return response
  },
  (error) => {
    let { message } = error
    let status

    if (status === '401' && window !== undefined) {
      window?.location?.replace('/login')
      removeFromLocalStorage(ACCESS_TOKEN_KEY)
    }
    if (error.response) {
      message = error.response.data.message
      status = error.response.status
    }
    const err: ApiResponse = {
      data: error,
      message,
      type: ResponseMessage.ERROR,
      status,
    }
    return Promise.reject(err)
  },
)
