import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { diContainer } from "@fastify/awilix";
import { PrismaClient } from "@prisma/client";
import { TokenService, AuthService, UserService } from '@services/index';
import { AuthController, UserController } from '@controllers/index'
import { asClass, asFunction } from "awilix";

/** controllers
 *  создаем инстансы сразу, чтобы fastify зарегестрировал роуты при старте приложения
 */
export const registerControllers = (fastify: FastifyInstance, opts: FastifyPluginOptions, next: (err?: Error) => void) => {
  const authController = new AuthController(fastify);
  const userController =  new UserController(fastify);
  fastify.diContainer.register({
      authController: asFunction(() => authController),
      userController: asFunction(() => userController),
  })

  next()
}

export function init (fastifyApp: FastifyInstance) {
    const prisma = new PrismaClient()
    diContainer.register({
        // main
        prismaClient: asFunction(() => prisma),
        fastify: asFunction(() => fastifyApp),

        // services
        authService: asClass(AuthService),
        tokenService: asClass(TokenService),
        userService: asClass(UserService)
      });

      // контроллеры создаем в самом конце
      fastifyApp.register(registerControllers, { prefix: '/api' });
}