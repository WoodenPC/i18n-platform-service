import { UserDto } from "@dto/user.dto";
import { checkPassword, hashPassword } from "@lib/crypto";
import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "@shared/exceptions";
import { FastifyInstance } from "fastify";

export class UserService {
    private prismaClient: PrismaClient;

    constructor({ prismaClient }: { prismaClient: PrismaClient }) {
        this.prismaClient = prismaClient;
    }

    async createUser(userEmail: string, userPassword: string) {
        const candidate = await this.prismaClient.user.findUnique({
            where: {
                userEmail
            }
        });

        if (candidate) {
            throw new Error(`Пользователь с такими данными существует ${userEmail}`);
        }

        const hashedPassword =  await hashPassword(userPassword);
        const userModel = await this.prismaClient.user.create({
            data: {
                userEmail,
                userPassword: hashedPassword,
            }
        });

        return new UserDto(userModel);
    }

    async getUser( userEmail: string, userPassword: string) {
        const user = await this.prismaClient.user.findUnique({
            where: {
                userEmail
            }
        });

        if (!user) {
            throw new BadRequestError('Пользователь не найден');
        }

        const isPassEqual = checkPassword(userPassword, user.userPassword);

        if (!isPassEqual) {
            throw new BadRequestError('Некорректный пароль');
        }

        return new UserDto(user);
    }
}