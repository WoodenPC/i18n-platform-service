import { User } from "@prisma/client";

export class AuthUserResponseDto {
    public readonly userEmail: string;
    public readonly id: bigint;

    constructor(userModel: User) {
        this.userEmail = userModel.userEmail;
        this.id = userModel.id;
    }
}