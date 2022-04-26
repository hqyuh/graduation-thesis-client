import { string } from "yup";

export interface UserSignIn {
    email: string;
    password: string;
}

export interface UserSignUp {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
}

export interface UserChangeInfo {
    username: string;
    name: string;
    email: string;
    password: string;
    phonenumber: string;
    dateofbirth: string;
    
}

export interface CurrentUserModel extends Omit<UserSignUp, 'password'>{
    created_at: string;
}

export interface AuthContextApi {
    currentUser: CurrentUserModel | null;
    error: any;
    login: (user: UserSignIn) => Promise<void>;
    register: (user: UserSignUp) => Promise<void>
    setting: (user: UserChangeInfo) => Promise<void>;
}