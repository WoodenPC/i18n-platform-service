import { FastifyInstance } from "fastify";
import { diContainer } from "@fastify/awilix";
import { PrismaClient } from "@prisma/client";
import { TokenService } from "@services/token.service";
import { AuthService } from "@services/auth.service";
import { asClass, asFunction, Lifetime } from "awilix";


export function init (fastifyApp: FastifyInstance) {
    const prisma = new PrismaClient()
    diContainer.register({
        prismaClient: asFunction(() => prisma),
        fastify: asFunction(() => fastifyApp),
        authService: asClass(AuthService),
        tokenService: asClass(TokenService)
      });
}