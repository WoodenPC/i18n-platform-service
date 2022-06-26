import { User } from "@prisma/client";

export class UserDto {
    private userName: string;
    private userEmail: string;
    constructor(userModel: User) {
        this.userEmail = userModel.userEmail;
        this.userName = userModel.userName;
    }

    getName() {
        return this.userName;
    }

    getEmail() {
        return this.userEmail;
    }
}