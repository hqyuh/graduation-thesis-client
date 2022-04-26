export interface ExamModel {
  id: string
  testName: string
  dateCreated: string
  examTime: number
  isStart: string
  isEnd: string
  activationCode: string
  question: Array<any>
}
