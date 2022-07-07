import { UserController } from "@controllers/user.controller";
import { FastifyInstance } from "fastify";

export const registerUserRoutes = (fastify: FastifyInstance) => {
    const userController = fastify.diContainer.resolve<UserController>('userController');
    fastify.get('/user', userController.getUser);
}