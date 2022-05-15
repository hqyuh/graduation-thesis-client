import React from 'react'
import withAuth from '../../hocs/withAuth'
import getLayout from '../../shared/getLayout'
import { NextPageWithLayout } from '../_app'

const Index: NextPageWithLayout = () => <div className="px-3">
         <div className="card py-5">
        <div className="card-header">
          <h4 className="app-modal-title text-center text-success">
            Bạn đã hoàn thành bài thi
          </h4>
        </div>
        <div className="confetti">
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
        </div>
        <div className="body">
          <div className="block text-center py-4">
            <p className="card-subtitle">
              Số điểm của bạn là: <span className="text-center font-weight-500 text-success">mark</span>
            </p>
          </div>
        </div>
      </div>
    </div>

const WithTestSuccess = withAuth(Index)

WithTestSuccess.getLayout = getLayout

export default WithTestSuccess