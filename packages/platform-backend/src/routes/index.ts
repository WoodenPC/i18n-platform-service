import { FastifyInstance,FastifyPluginOptions , DoneFuncWithErrOrRes } from "fastify";
import { authRoute } from "./auth/auth.route";

export const routes = (fastify: FastifyInstance, opts: FastifyPluginOptions, next: (err?: Error) => void) => {
    // console.log('routes', fastify);
    authRoute(fastify);
    next()
}