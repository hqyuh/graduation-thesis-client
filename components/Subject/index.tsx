/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
import React from 'react'
import BackGroundSubjectIcon from '../../icons/BackGroundSubjectIcon'
import { ExamModel } from '../../models/exam.model';

interface SubjectProps {
    className?: string;
    subject: ExamModel
}

const Subject: React.FC<SubjectProps> = ({children, className = '', subject}) => {
    return (
        <div className={`subject ${className}`}>
            <BackGroundSubjectIcon/>
            <span className="btn btn-grey subject-question-number">12 Q</span>
            <span className="btn btn-grey subject-draft">Bản thảo</span>
            <p className="px-2 py-3">{subject?.topicName}</p>
            {children}
        </div>
    )
}

export default Subject