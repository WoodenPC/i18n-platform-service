import { UserDto } from "@dto/user.dto";
import { hashPassword } from "@lib/crypto";
import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";

export class UserService {
    private prismaClient: PrismaClient;

    constructor({ prismaClient }: { prismaClient: PrismaClient }) {
        this.prismaClient = prismaClient;
    }

    async singUp(userName: string, userEmail: string, userPassword: string) {
        const candidate = await this.prismaClient.user.findUnique({
            where: {
                userEmail_userName: {
                    userEmail,
                    userName
                }
            }
        })

        if (candidate) {
            throw new Error(`Пользователь с такими данными существует ${userName}-${userEmail}`);
        }

        const hashedPassword =  await hashPassword(userPassword);
        const userModel = await this.prismaClient.user.create({
            data: {
                userEmail,
                userName,
                userPassword: hashedPassword,
            }
        });

        return new UserDto(userModel);
    }
}