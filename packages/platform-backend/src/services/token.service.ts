import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { BadRequestError } from "@shared/exceptions";
import { CustomFastifyJWT, UserJWTPayload } from "@shared/types/jwt";
import { ValidateTokenDto } from "@dto/token.dto";
import { AuthUserResponseDto } from "@dto/auth.dto";


export class TokenService {
    private jwt: CustomFastifyJWT;
    private prismaClient: PrismaClient;
    constructor({ fastify, prismaClient }: { fastify: FastifyInstance, prismaClient: PrismaClient }) {
        this.jwt = fastify.jwt as unknown as CustomFastifyJWT;
        this.prismaClient = prismaClient;
    }

    async generateToken(userDto: AuthUserResponseDto) {
        const accessToken = this.jwt.access.sign({ id: userDto.id.toString(), userEmail: userDto.userEmail }, { expiresIn: '30m',  });
        const refreshToken = this.jwt.refresh.sign({ id: userDto.id.toString(), userEmail: userDto.userEmail }, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userDto: AuthUserResponseDto, refreshToken: string) {
        const tokenData = await this.prismaClient.authToken.findUnique({
            where: {
                userId: userDto.id
            }
        });

        if (tokenData) {
            return await this.prismaClient.authToken.update({
                where: {
                    userId: userDto.id
                },
                data: {
                    refreshToken
                }
            });

        }

        return this.prismaClient.authToken.create({
            data: {
                refreshToken,
                userId: userDto.id
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
            return new ValidateTokenDto(this.jwt.access.verify<UserJWTPayload>(token));
        } catch(e) {
            console.error(e);
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            return new ValidateTokenDto(this.jwt.refresh.verify<UserJWTPayload>(token));
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