import { diContainer } from "@fastify/awilix";
import { PrismaClient } from "@prisma/client";
import { asClass } from "awilix";

export class UserController {
    private prismaClient: PrismaClient;

    constructor({ prismaClient }: { prismaClient: PrismaClient }) {
        this.prismaClient = prismaClient;
    }

    async createUser(userName: string, userEmail: string, userPassword: string) {
        await this.prismaClient.user.create({
            data: {
                userEmail,
                userName,
                userPassword
            }
        })
    }
}

diContainer.register({
    prismaClient: asClass(PrismaClient)
})