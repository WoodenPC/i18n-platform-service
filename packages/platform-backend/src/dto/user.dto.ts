import { User } from "@prisma/client";

export class UserDto {
    private userEmail: string;
    private id: bigint;
    constructor(userModel: User) {
        this.userEmail = userModel.userEmail;
        this.id = userModel.id;
    }

    getEmail() {
        return this.userEmail;
    }

    getId() {
        return this.id;
    }
}