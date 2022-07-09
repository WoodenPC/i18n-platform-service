import { UserJWTPayload } from "@shared/types/jwt";

export class ValidateTokenDto {
    public readonly id: bigint;
    public readonly userEmail: string;

    constructor(tokenPayload: UserJWTPayload) {
        this.id = BigInt(tokenPayload.id);
        this.userEmail = tokenPayload.userEmail;
    }
}