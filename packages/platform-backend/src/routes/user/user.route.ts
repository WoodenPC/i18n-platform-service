import { FastifyInstance, FastifyPluginOptions } from "fastify";

export const userRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
    // fastify.register('/users')
    fastify.get('/testUser', () => {
        return 'hello world';
    })
}