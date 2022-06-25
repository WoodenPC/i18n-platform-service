import { FastifyInstance,FastifyPluginOptions , DoneFuncWithErrOrRes } from "fastify";
import { userRoute } from "./user/user.route";

export const routes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: (err?: Error) => void) => {
    userRoute(fastify, opts);
    done()
}