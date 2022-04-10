import React from 'react'
import getLayout from "../shared/getLayout";
import { NextPageWithLayout } from "./_app";

const ErrorPage: NextPageWithLayout = () => (<h1 className="text-danger font-weight-800">404</h1>)

ErrorPage.getLayout = getLayout

export default ErrorPage