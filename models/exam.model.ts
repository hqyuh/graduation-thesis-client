import { Moment } from "moment"
import { AnswersResponseTuple } from "../components/CheckBoxAnswer"

export interface ExamModel {
  id: string
  testName: string
  dateCreated: Date
  examTime: Date | Moment
  isStart: Date | Moment
  isEnd: Date | Moment
  activationCode: string
  questions: QuestionModel[]
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