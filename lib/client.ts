import axios, { AxiosResponse } from 'axios'
import { ACCESS_TOKEN_KEY } from '../constants/index'
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
  headers: {
    Authorization: typeof window !== 'undefined' && `Bearer ${loadFromLocalStorage(ACCESS_TOKEN_KEY)}`,
  },
})

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && response.data.type === ResponseMessage.ERROR) {
      return Promise.reject(response.data)
    }
    saveToLocalStorage(ACCESS_TOKEN_KEY, response.headers.Authorization)
    return response
  },
  (error) => {
    let { message } = error
    let status
    // eslint-disable-next-line eqeqeq
    if (status == '401') {
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
