import { AuthController } from "@controllers/auth.controller";
import { authOnly } from "@guards/authOnly";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export const registerAuthRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, next: (err?: Error) => void) => {
    const authController = fastify.diContainer.resolve<AuthController>('authController');
    fastify.post('/auth/signIn', authController.signIn);
    fastify.post('/auth/signUp', authController.signUp);
    fastify.post('/auth/refresh', authController.refresh);
    fastify.post('/auth/logout', { preHandler: [authOnly] }, authController.logout);

    next();
}