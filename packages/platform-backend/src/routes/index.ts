import { FastifyInstance,FastifyPluginOptions , DoneFuncWithErrOrRes } from "fastify";
import { userRoute } from "./user/user.route";

export const routes = (fastify: FastifyInstance, opts: FastifyPluginOptions, next: (err?: Error) => void) => {
    // console.log('routes', fastify);
    userRoute(fastify, opts);
    next()
}