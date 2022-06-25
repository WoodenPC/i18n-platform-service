import { diContainer } from "@fastify/awilix";
import { PrismaClient, User } from "@prisma/client";
import { asClass } from "awilix";

export class TeamController {
    private prismaClient: PrismaClient;

    constructor({ prismaClient }: { prismaClient: PrismaClient }) {
        this.prismaClient = prismaClient;
    }

    async createTeam(teamName: string, user: User) {
        await this.prismaClient.team.create({
            data: {
                teamName,
                teamUsers: {
                    create: user
                }
            }
        })
    }
}

diContainer.register({
    prismaClient: asClass(PrismaClient)
})