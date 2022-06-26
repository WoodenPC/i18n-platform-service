import { User } from "@prisma/client";

export class UserDto {
    private userName: string;
    private userEmail: string;
    private id: bigint;
    constructor(userModel: User) {
        this.userEmail = userModel.userEmail;
        this.userName = userModel.userName;
        this.id = userModel.id;
    }

    getName() {
        return this.userName;
    }

    getEmail() {
        return this.userEmail;
    }

    getId() {
        return this.id;
    }
}