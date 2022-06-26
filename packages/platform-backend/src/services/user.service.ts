import { PrismaClient } from "@prisma/client";
import crypto from 'crypto';
import { promisify } from "util";

const randomBytesAsync = promisify(crypto.randomBytes);
const pbkdf2Async = promisify(crypto.pbkdf2);

export class UserService {
    private prismaClient: PrismaClient;

    constructor({ prismaClient }: { prismaClient: PrismaClient }) {
        this.prismaClient = prismaClient;
    }
    async singUp(userName: string, userEmail: string, userPassword: string) {
        // const candidate = await this.prismaClient.user.findUnique({
        //     where: {
        //         userEmail_userName: {
        //             userEmail,
        //             userName
        //         }
        //     }
        // })

        // if (candidate) {
        //     throw new Error(`Пользователь с такими данными существует ${userName}-${userEmail}`);
        // }

        const salt = crypto.randomBytes(16).toString('hex');
        const hash = (await pbkdf2Async(userPassword, salt, 1000, 64, 'sha512')).toString('hex');

        console.log('hash', hash);

        // const user = await this.prismaClient.user.create({
        //     data: {
        //         userEmail,
        //         userName,
        //         userPassword: hash
        //     }
        // })
    }
}