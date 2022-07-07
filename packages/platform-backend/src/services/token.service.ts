import { UserDto } from "@dto/user.dto";
import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { BadRequestError } from "@shared/exceptions";
import { CustomFastifyJWT, UserJWTPayload } from "@shared/types/jwt";


export class TokenService {
    private jwt: CustomFastifyJWT;
    private prismaClient: PrismaClient;
    constructor({ fastify, prismaClient }: { fastify: FastifyInstance, prismaClient: PrismaClient }) {
        this.jwt = fastify.jwt as unknown as CustomFastifyJWT;
        this.prismaClient = prismaClient;
    }

    async generateToken(userDto: UserDto) {
        console.log(userDto.getId().toString());
        const accessToken = this.jwt.access.sign({ id: userDto.getId().toString(), userEmail: userDto.getEmail() }, { expiresIn: '30m',  });
        const refreshToken = this.jwt.refresh.sign({ id: userDto.getId().toString(), userEmail: userDto.getEmail() }, { expiresIn: '30d' });

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

    async deleteToken(token: string) {
        const data = this.jwt.refresh.decode<UserJWTPayload>(token);
        if (!data) {
            throw new BadRequestError('Incorrect token');
        }
        return await this.prismaClient.authToken.delete({
            where: {
                userId: BigInt(data.id)
            }
        })
    }

    validateAccessToken(token: string) {
        try {
            return this.jwt.access.verify<UserJWTPayload>(token);
        } catch(e) {
            console.error(e);
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            return this.jwt.refresh.verify<UserJWTPayload>(token);
        } catch(e) {
            console.error(e);
            return null;
        }
    }

    async findRefreshTokenInDb(userId: bigint) {
        return this.prismaClient.authToken.findUnique({
            where: {
                userId
            }
        })
    }
}