import { UserDto } from "@dto/user.dto";
import { PrismaClient } from "@prisma/client";
import { JWT } from '@fastify/jwt';
import { FastifyInstance } from "fastify";

type CustomFastifyJWT = {
    access: JWT;
    refresh: JWT
}

export class TokenService {
    private jwt: CustomFastifyJWT;
    private prismaClient: PrismaClient;
    constructor({ fastify, prismaClient }: { fastify: FastifyInstance, prismaClient: PrismaClient }) {
        this.jwt = fastify.jwt as unknown as CustomFastifyJWT;
        this.prismaClient = prismaClient;
    }

    async generateToken(userDto: UserDto) {
        const accessToken = this.jwt.access.sign({ id: userDto.getId().toString(), userEmail: userDto.getEmail(), userName: userDto.getName() }, { expiresIn: '30m',  });
        const refreshToken = this.jwt.refresh.sign({ id: userDto.getId().toString(), userEmail: userDto.getEmail(), userName: userDto.getName() }, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userDto: UserDto, refreshToken: string) {
        const tokenData = await this.prismaClient.authToken.findUnique({
            where: {
                userId: userDto.getId()
            }
        });

        if (tokenData) {
            return await this.prismaClient.authToken.update({
                where: {
                    userId: userDto.getId()
                },
                data: {
                    refreshToken
                }
            });

        }

        return this.prismaClient.authToken.create({
            data: {
                refreshToken,
                userId: userDto.getId()
            }
        })
    }
}