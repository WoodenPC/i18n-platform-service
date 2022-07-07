import { FastifyInstance } from "fastify";
import { diContainer } from "@fastify/awilix";
import { PrismaClient } from "@prisma/client";
import { TokenService, AuthService, UserService } from '@services/index';
import { AuthController, UserController } from '@controllers/index'
import { asClass, asFunction } from "awilix";

export function init (fastifyApp: FastifyInstance) {
  const prisma = new PrismaClient()
  diContainer.register({
      // main
      prismaClient: asFunction(() => prisma),
      fastify: asFunction(() => fastifyApp),

      // services
      authService: asClass(AuthService),
      tokenService: asClass(TokenService),
      userService: asClass(UserService),

      //controllers
      authController: asClass(AuthController),
      userController: asClass(UserController)
    });
}