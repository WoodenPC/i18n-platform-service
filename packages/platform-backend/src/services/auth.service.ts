import { GetUserResponseDto } from "@dto/user.dto";
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import { BadRequestError, UnathorizedError } from "@shared/exceptions";
import { TokenService } from "./token.service";
import { AuthUserResponseDto } from "@dto/auth.dto";

export class AuthService {
    private prismaClient: PrismaClient;
    private tokenService: TokenService;

    constructor({ prismaClient, tokenService }: { prismaClient: PrismaClient, tokenService: TokenService }) {
        this.prismaClient = prismaClient;
        this.tokenService = tokenService;
    }

    async signUp(userEmail: string, userPassword: string) {
        const candidate = await this.prismaClient.user.findUnique({
            where: {
                userEmail
            }
        });

        if (candidate) {
            throw new Error(`Пользователь с такими данными существует ${userEmail}`);
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const userModel = await this.prismaClient.user.create({
            data: {
                userEmail,
                userPassword: hashedPassword,
            }
        });

       const userDto = new AuthUserResponseDto(userModel);
       const { accessToken, refreshToken } = await this.tokenService.generateToken(userDto);

       await this.tokenService.saveToken(userDto, refreshToken);

       return { user: userDto, accessToken, refreshToken }
    }

    async signIn( userEmail: string, userPassword: string) {
        const user = await this.prismaClient.user.findUnique({
            where: {
                userEmail
            }
        });

        if (!user) {
            throw new BadRequestError('User not found');
        }
        

        const isPassEqual = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPassEqual) {
            throw new BadRequestError('Incorrect password');
        }

        const userDto = new AuthUserResponseDto(user);
        const { accessToken, refreshToken } = await this.tokenService.generateToken(userDto);
        await this.tokenService.saveToken(userDto, refreshToken);
        return { accessToken, refreshToken, user: userDto }
    }

    async logout(refreshToken: string) {
        await this.tokenService.deleteToken(refreshToken);
    }

    async refresh(refreshToken?: string) {
        if (!refreshToken) {
            throw new UnathorizedError();
        }

        const userTokenData = this.tokenService.validateRefreshToken(refreshToken);

        if (!userTokenData) {
            throw new UnathorizedError();
        }

        const tokenFromDb = await this.tokenService.findRefreshTokenInDb(userTokenData.id);

        if (!tokenFromDb) {
            throw new UnathorizedError();
        }

        const userModel =  await this.prismaClient.user.findUnique({
            where: {
                id: userTokenData.id
            }
        });

        if (!userModel) {
            throw new UnathorizedError();
        }

        const userDto = new GetUserResponseDto(userModel);
        const tokens = await this.tokenService.generateToken(userDto);

        return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, user: userDto };
    }
}