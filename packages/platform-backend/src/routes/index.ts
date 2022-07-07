import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { registerAuthRoutes } from './auth.routes';
import { registerUserRoutes } from './user.routes';

export const registerRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, next: (err?: Error) => void) => {
    registerAuthRoutes(fastify);
    registerUserRoutes(fastify);
    next();
}