import { FastifyInstance } from "fastify";
import { diContainer } from "@fastify/awilix";
import { PrismaClient } from "@prisma/client";
import { TokenService, AuthService, UserService, GroupsService, TeamService } from '@services/index';
import { AuthController, UserController, GroupsController, TeamController } from '@controllers/index'
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
      groupsService: asClass(GroupsService),
      teamService: asClass(TeamService),

      //controllers
      authController: asClass(AuthController),
      userController: asClass(UserController),
      groupsController: asClass(GroupsController),
      teamController: asClass(TeamController)
    });
}