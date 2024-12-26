import { RegisterUser, User } from "../interfaces/user.interface";

export class UserModel implements User {
    constructor(
        public username: string,
        public password: string
    ) {}
}

export class RegisterUserModel extends UserModel implements RegisterUser {
    constructor(
        username: string,
        password: string,
        public confirm_password: string
    ) {
        super(username, password);
    }
}