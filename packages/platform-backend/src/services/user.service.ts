import { UserDto } from "@dto/user.dto";
import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "@shared/exceptions";

export class UserService {
    private prismaClient: PrismaClient;

    constructor({ prismaClient }: { prismaClient: PrismaClient }) {
        this.prismaClient = prismaClient;
    }


    async getUserById(userId: bigint) {
        const userModel = await this.prismaClient.user.findUnique({
            where: {
                id: userId
            },
        });

        if (!userModel) {
            throw new BadRequestError(`User with ${userId} not found`);
        }

        return new UserDto(userModel);
    }

    async getUserGroups(userId: bigint) {
        const userModel = await this.prismaClient.user.findUnique({
            where: {
                id: userId
            },
            include: {
                groups: true,
            }
        });

        if (!userModel) {
            throw new BadRequestError(`User with ${userId} not found`);
        }

    }
}