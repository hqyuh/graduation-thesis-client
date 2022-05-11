/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
import React, { MouseEvent, SyntheticEvent } from 'react'
import BackGroundSubjectIcon from '../../icons/BackGroundSubjectIcon'
import CrossIcon from '../../icons/CrossIcon'
import SettingIcon from '../../icons/SettingIcon'
import TrashIcon from '../../icons/TrashIcon'
import { ExamModel } from '../../models/exam.model'
import { ExamFormEvent } from '../UpdateSubjectForm'

interface SubjectProps {
  className?: string
  subject: ExamModel
  onClick?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Subject: React.FC<SubjectProps & ExamFormEvent> = ({
  children,
  className = '',
  subject,
  onDeleteClick,
  onSettingClick,
  onClick,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={`subject ${className}`} onClick={onClick || console.log}>
      <TrashIcon
        className="trash-icon"
        onClick={(e: SyntheticEvent) => {
          e.stopPropagation()
          onDeleteClick(subject.id)
        }}
      />
        {!children ? (      <SettingIcon
        className="setting-icon"
        onClick={(e: SyntheticEvent) => {
          e.stopPropagation()
          onSettingClick(subject)
        }}
      />):       <CrossIcon
      className="setting-icon"
      onClick={(e: SyntheticEvent) => {
        e.stopPropagation()
        onSettingClick(subject)
      }}
    />}
      <BackGroundSubjectIcon />
      <span className="btn btn-grey subject-question-number">{subject?.questions.length}&nbsp;Q</span>
      <span className="btn btn-grey subject-draft">Bản thảo</span>
      <p className="px-2 pt-3 w-100 text-center">{subject?.testName}</p>
      <p className="hour py-1">60 minutes</p>
      {!children && (
        <div className="d-flex justify-content-center align-items-center">
          <p className="start mx-2">abc</p>
          &nbsp; -<p className="end mx-2">xyz</p>
          &nbsp;
        </div>
      )}
      {children}
    </div>
  )
}

export default Subject
