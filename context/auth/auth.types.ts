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
    avatar: string;
    role: keyof typeof UserRole
}

export enum UserRole {
    'ROLE_USER' = 'ROLE_USER',
    'ROLE_TEACHER' = 'ROLE_TEACHER',
    'ROLE_ADMIN' = 'ROLE_ADMIN',
}
export interface UserChangeInfo {
    username: string;
    name: string;
    email: string;
    password: string;
    phonenumber: string;
    dateofbirth?: Date;
    avatar: string;
    
}

export interface CurrentUserModel extends Omit<UserSignUp, 'password'>{
    created_at: string;
    roles: keyof typeof UserRole
}

export interface AuthContextApi {
    currentUser: CurrentUserModel | null;
    error: any;
    login: (user: UserSignIn) => Promise<void>;
    register: (user: UserSignUp) => Promise<void>
    setting: (user: UserChangeInfo) => Promise<void>;
}