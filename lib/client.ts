import axios from 'axios'

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
  withCredentials: true,
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.type === ResponseMessage.ERROR) {
      return Promise.reject(response.data)
    }
    return response
  },
  (error) => {
    let { message } = error
    let status
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