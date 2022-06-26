import { UserController } from "@controllers/user.controller";
import { diContainer } from "@fastify/awilix";
import { PrismaClient } from "@prisma/client";
import { TokenService } from "@services/token.service";
import { UserService } from "@services/user.service";
import { asClass, asFunction, Lifetime } from "awilix";

export function init () {
    const prisma = new PrismaClient()
    diContainer.register({
        prismaClient: asFunction(() => prisma),
        userController: asClass(UserController, {
          lifetime: Lifetime.SINGLETON,
        }),
        userService: asClass(UserService),
        tokenService: asClass(TokenService)
      });
}