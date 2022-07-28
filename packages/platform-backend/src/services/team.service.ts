import { PrismaClient } from "@prisma/client";
import { CustomFastifyJWT } from "@shared/types/jwt";
import { FastifyInstance } from "fastify";

export class TeamService {
    // todo invite to team
    private jwt: CustomFastifyJWT;
    private prismaClient: PrismaClient;
    constructor({ fastify, prismaClient }: { fastify: FastifyInstance, prismaClient: PrismaClient }) {
        this.jwt = fastify.jwt as unknown as CustomFastifyJWT;
        this.prismaClient = prismaClient;
    }

    activateInviteLink(activationToken: string) {
        // todo add to users team collection
    }

    inviteUser() {
        //todo send invite link
    }

    deleteUser() {

    }

    changeUserRole() {

    }
}