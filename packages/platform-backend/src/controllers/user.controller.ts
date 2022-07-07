import { UserService } from "@services/user.service";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export class UserController {
    private userService: UserService;

    constructor(fastify: FastifyInstance) {
        this.userService = fastify.diContainer.resolve<UserService>('userService');
        fastify.get('/user', this.getUser);
    }

    async getUser(req: FastifyRequest, res: FastifyReply) {
        return this.userService.getUserById(BigInt(req.user.id));
    }
}