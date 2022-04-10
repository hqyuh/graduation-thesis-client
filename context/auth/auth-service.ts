import { ApiResponse, axiosClient } from "../../lib/client";
import { CurrentUserModel, UserSignIn, UserSignUp } from './auth.types';

const getCurrentUser = (): Promise<ApiResponse<CurrentUserModel>> => axiosClient.get('/user/me')

const login = (user: UserSignIn): Promise<ApiResponse<CurrentUserModel>>  => axiosClient.post('/user/login',user)

const register = (user: UserSignUp): Promise<ApiResponse<CurrentUserModel>>  => axiosClient.post('/user/register',user)


const authServices = {
    getCurrentUser,
    login,
    register,
}

export default authServices