import React from 'react'
import Modal, { Styles } from 'react-modal'

export const customStyles: Styles = {
  content: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'fixed',
    margin: 'auto',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#E5E5E5!important',
    border: 'none!important',
  },
  
}

interface ConfirmExamModalProps {
  isOpen: boolean
}

const ConfirmExamModal: React.FC<ConfirmExamModalProps> = ({ isOpen, children }) => (
  <Modal isOpen={isOpen} ariaHideApp style={customStyles}>
    {
        children
    }
  </Modal>
)

export default ConfirmExamModal
