import { User } from "@prisma/client";
import { UsersGroupDto } from "./user-group.dto";

export class UserDto {
    private userEmail: string;
    private id: bigint;
    // private userGroups: UsersGroupDto[];

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