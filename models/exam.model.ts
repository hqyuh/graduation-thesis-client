import { AnswersResponseTuple } from "../components/CheckBoxAnswer"

export interface ExamModel {
  id: string
  testName: string
  dateCreated: Date
  examTime: Date
  isStart: Date
  isEnd: Date
  activationCode: string
  question: QuestionModel
}

export interface QuestionModel extends AnswersResponseTuple {
  id: 3,
  topicQuestion: string,
  questionImageUrl: string | null ,
  correctResult: string,
  mark: number,
  milestones: number,
  dateCreated: string
}