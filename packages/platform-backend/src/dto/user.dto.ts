import { User } from "@prisma/client";

export class UserDto {
    private userName: string;
    private userEmail: string;
    constructor(user: User) {
        this.userEmail = user.userEmail;
        this.userName = user.userName;
    }

    getName() {
        return this.userName;
    }

    getEmail() {
        return this.getEmail;
    }
}