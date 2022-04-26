import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/auth/auth.provider'
import withAuth from '../hocs/withAuth'
import getLayout from '../shared/getLayout'
import { NextPageWithLayout } from './_app'
import { useTranslations } from '../context/Localization'
import { Button } from 'primereact/button'
import HomePageSearch from './homepagesearch'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const Account: NextPageWithLayout = () => {
  const { currentUser } = useAuth()
  const { t } = useTranslations()

  let emptyAccount = {
    username: null,
    fullName: null,
    email: null,
    password: null,
    phoneNumber: null,
    dateofbirth: null,
    img: null,
    status: false,
  }

  const [accounts, setAccounts] = useState(null)
  const [account, setAccount] = useState(emptyAccount)
  const [selectedAccounts, setSelectedAccounts] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [accountDialog, setAccountDialog] = useState(false)
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false)
  const dt = useRef(null)


  const openNew = () => {
    setAccount(emptyAccount)
    setSubmitted(false)
    setAccountDialog(true)
  }
  const confirmDeleteSelected = () => {
    setDeleteAccountDialog(true)
  }

  /// đây là bản mẫu trên prime. Em huy   fix nhé/
  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`images/product/${rowData.image}`}
        onError={(e) => /*e.target.src=*/ 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
        alt={rowData.image}
        className="product-image"
      />
    )
  }
  // Đây là func tạo 2 nút sửa và xóa ở cuối hàng mỗi row. func mẫu.
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          //   onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          //   onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    )
  }

  return (
    <div className="account rounded-10">
      <div className="p-3 d-flex border rounded-10 shadow">
        <Button label="New Account" icon="pi pi-plus" className="p-button-success mx-3" onClick={openNew} />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger mx-3"
          onClick={confirmDeleteSelected}
          disabled={!selectedAccounts || !setSelectedAccounts.length}
        />
        <HomePageSearch />
      </div>
      <div className="datatable-crud-demo mt-3 rounded-10 shadow overflow-hidden">
        <div className="card">
          <DataTable
            ref={dt}
            value={accounts}
            selection={selectedAccounts}
            onSelectionChange={(e) => setSelectedAccounts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
            <Column
              field="username"
              header={t('User Name') || 'User Name'}
              sortable
              style={{ minWidth: '12rem' }} value ={emptyAccount.username.toString()}></Column>
            <Column
              field="fullname"
              header={t('Full Name') || 'Full Name'}
              sortable
              style={{ minWidth: '12rem' }}></Column>
            <Column field="image" header="Image" body={imageBodyTemplate}></Column>

            <Column field="email" header={t('Email') || 'Email'} sortable style={{ minWidth: '16rem' }}></Column>
            <Column
              field="phonenumber"
              header={t('Phone Number') || 'Phone Number'}
              sortable
              style={{ minWidth: '12rem' }}></Column>

            <Column
              field="password"
              header={t('Password') || 'Password'}
              sortable
              style={{ minWidth: '12rem' }}></Column>
            <Column
              field="dateofbirth"
              header={t('Date Of Birth') || 'Date Of Birth'}
              sortable
              style={{ minWidth: '12rem' }}></Column>
            <Column field="block" header={t('Block') || 'Block'} sortable style={{ minWidth: '12rem' }}></Column>
            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  )
}

const WithAuthAccount = withAuth(Account)

WithAuthAccount.getLayout = getLayout

export default WithAuthAccount
