import { ApiResponse, axiosClient } from "../../lib/client";
import { CurrentUserModel, UserSignIn } from './auth.types';

const getCurrentUser = (): Promise<ApiResponse<CurrentUserModel>> => axiosClient.get('/user')

const login = (user: UserSignIn): Promise<ApiResponse<CurrentUserModel>>  => axiosClient.post('/login',user)

const authServices = {
    getCurrentUser,
    login,
}

export default authServices