import { diContainer } from "@fastify/awilix";
import { PrismaClient } from "@prisma/client";
import { UserService } from "@services/user.service";
import { asClass, Lifetime } from "awilix";

export class UserController {
    private prismaClient: PrismaClient;
    private userService: UserService;

    constructor({ prismaClient, userService }: { prismaClient: PrismaClient, userService: UserService }) {
        this.prismaClient = prismaClient;
        this.userService = userService;
    }

    async signUp(userName: string, userEmail: string, userPassword: string) {
       return await this.userService.singUp(userName, userEmail, userPassword);
    }

    async signIn() {

    }

    async refreshToken() {

    }
}

// diContainer.register({
//     // userController: asClass(UserController),
//     userController: asClass(UserController, {
//         lifetime: Lifetime.SINGLETON
//     }),
//     // prismaClient: asClass(PrismaClient, {
//     //     lifetime: Lifetime.SINGLETON
//     // })
// })