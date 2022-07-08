import { UserController } from "@controllers/user.controller";
import { authOnly } from "@guards/authOnly";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export const registerUserRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, next: (err?: Error) => void) => {
    const userController = fastify.diContainer.resolve<UserController>('userController');

    fastify.addHook('preHandler', authOnly);

    fastify.get('/user', userController.getUser);
    fastify.get('/user/groups', userController.getUserGroups);

    next();
}