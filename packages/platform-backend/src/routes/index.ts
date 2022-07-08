import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { registerAuthRoutes } from './auth.routes';
import { registerUserRoutes } from './user.routes';
import { registerGroupsRoutes } from './groups.routes';

export const registerRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, next: (err?: Error) => void) => {
    fastify.register(registerAuthRoutes);
    fastify.register(registerUserRoutes);
    fastify.register(registerGroupsRoutes);
    next();
}