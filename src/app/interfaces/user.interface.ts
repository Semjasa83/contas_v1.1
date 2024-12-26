export interface User {
    username: string;
    password: string;
}

export interface RegisterUser extends User {
    confirm_password: string | null | undefined;
}