export interface ExamModel {
  id: string
  testName: string
  dateCreated: Date
  examTime: Date
  isStart: Date
  isEnd: Date
  activationCode: string
  question: Array<any>
}
