import { confirmDialog } from 'primereact/confirmdialog'
import { SplitButton } from 'primereact/splitbutton'
import React from 'react'
import { toast } from 'react-toastify'
import ExamService from '../../services/exam-service'

interface Props {
    index: number
    content: string
    id: string | number
    onUpdateClick : () => void
    type: 'update' | 'exam'
}

const AnswerContainer: React.FC<Props> = ({children, content, index, id, onUpdateClick, type}) => {
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: onUpdateClick,
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
                confirmDialog({
                    message: 'Bạn có muốn xóa câu hỏi?',
                    header: 'Xóa câu hỏi',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        ExamService.deleteQuestion(id).then(() => {
                            toast.success('Xóa thành công')
                        }).catch(() => toast.error('Xóa thất bại'))
                    },
                    reject: console.log,
                    acceptLabel: 'Có',
                    rejectLabel: 'Không',
                    acceptClassName: 'p-button-danger',
                  })
            },
        }
    ]
    return (
        <div className="answer-container py-3 px-2 my-2">
            <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
            <strong>Câu hỏi {index + 1}</strong>: &nbsp;<div className="content pb-0">{content}</div>
            </div>
            {
                type === 'update' && (<SplitButton icon="pi-star-fill" model={items} />)
            }
            </div>
            <div className="px-4 py-2">
                {children}
            </div>
        </div>
    )
    
}

AnswerContainer.defaultProps = {
    type: 'update',
}

export default AnswerContainer