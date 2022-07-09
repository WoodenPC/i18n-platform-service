import { UserService } from "@services/user.service";
import { FastifyReply, FastifyRequest } from "fastify";

export class UserController {
    private userService: UserService;

    constructor({ userService }: { userService: UserService }) {
        this.userService = userService;
    }

    getUser = async (req: FastifyRequest, res: FastifyReply) => {
        return this.userService.getUser(req.user.id);
    }
}