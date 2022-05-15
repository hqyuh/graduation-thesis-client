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

export enum UserRole {
    'ROLE_USER' = 'ROLE_USER',
    'ROLE_TEACHER' = 'ROLE_TEACHER',
    'ROLE_ADMIN' = 'ROLE_ADMIN',
}
export interface CurrentUserModel extends Omit<UserSignUp, 'password'>{
    created_at: string;
    role: keyof typeof UserRole
}

export interface AuthContextApi {
    currentUser: CurrentUserModel | null;
    error: any;
    login: (user: UserSignIn) => Promise<void>;
    register: (user: UserSignUp) => Promise<void>
}