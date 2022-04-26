import React from 'react'
import CreateQuestionContainer from '../../components/CreateQuestionContainer';
import withAuth from "../../hocs/withAuth";
import getLayout from "../../shared/getLayout";
import { NextPageWithLayout } from "../_app";

const Index: NextPageWithLayout = () => (<div><CreateQuestionContainer/></div>)

const WithAuthQuizzPage = withAuth(Index)

WithAuthQuizzPage.getLayout = getLayout

export default WithAuthQuizzPage