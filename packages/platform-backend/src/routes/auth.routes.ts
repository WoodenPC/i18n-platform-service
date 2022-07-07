import { AuthController } from "@controllers/auth.controller";
import { FastifyInstance } from "fastify";

export const registerAuthRoutes = (fastify: FastifyInstance) => {
    const authController = fastify.diContainer.resolve<AuthController>('authController');
    fastify.post('/auth/signIn', authController.signIn);
    fastify.post('/auth/signUp', authController.signUp);
    fastify.post('/auth/refresh', authController.refresh);
    fastify.post('/auth/logout', authController.logout);
}