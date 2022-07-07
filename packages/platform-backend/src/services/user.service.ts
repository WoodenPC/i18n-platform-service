import { UserDto } from "@dto/user.dto";
import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "@shared/exceptions";

export class UserService {
    private prismaClient: PrismaClient;

    constructor({ prismaClient }: { prismaClient: PrismaClient }) {
        this.prismaClient = prismaClient;
    }


    async getUserById(id: bigint) {
        const userModel = await this.prismaClient.user.findUnique({
            where: {
                id
            }
        });

        if (!userModel) {
            throw new BadRequestError(`User with ${id} not found`);
        }

        return new UserDto(userModel);
    }
}