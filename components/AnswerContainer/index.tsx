import { confirmDialog } from 'primereact/confirmdialog'
import { SplitButton } from 'primereact/splitbutton'
import React from 'react'

interface Props {
    index: number
    content: string
}

const AnswerContainer: React.FC<Props> = ({children, content, index}) => {
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {},
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
                confirmDialog({
                    message: 'Bạn có muốn xóa câu hỏi?',
                    header: 'Xóa câu hỏi',
                    icon: 'pi pi-exclamation-triangle',
                    accept: console.log,
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
            <SplitButton icon="pi-star-fill" model={items} />
            </div>
            <div className="px-4 py-2">
                {children}
            </div>
        </div>
    )
    
}
export default AnswerContainer