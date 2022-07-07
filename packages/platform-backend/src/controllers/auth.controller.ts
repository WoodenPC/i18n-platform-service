import { AuthService } from "@services/auth.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify";

const REFRESH_COOKIE_SETTINGS =  { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true };

export class AuthController {
    private authService: AuthService;

    constructor(fastify: FastifyInstance) {
        this.authService = fastify.diContainer.resolve<AuthService>('authService');
        fastify.post('/auth/signIn', this.signIn);
        fastify.post('/auth/signUp', this.signUp);
        fastify.post('/auth/refresh', this.refresh);
        fastify.post('/auth/logout', this.logout);
    }

    async signIn(req: FastifyRequest<{ Body: { userEmail: string; userPassword: string } }>, res: FastifyReply) {
        const { userEmail, userPassword } = req.body;
        const { accessToken, refreshToken } = await this.authService.signIn(userEmail, userPassword);
        res.setCookie('refreshToken', refreshToken,REFRESH_COOKIE_SETTINGS);
        return { accessToken };
    }

    async signUp(req: FastifyRequest<{ Body: { userEmail: string; userPassword: string } }>, res: FastifyReply) {
        const { userEmail, userPassword } = req.body;
        const { refreshToken, accessToken } =  await this.authService.signUp(userEmail, userPassword);
        res.setCookie('refreshToken', refreshToken, REFRESH_COOKIE_SETTINGS);
        return { accessToken};
    }

    async logout(req: FastifyRequest, res: FastifyReply) {
        const refreshToken = req.cookies['refreshToken'];
        await this.authService.logout(refreshToken);
        return res.send(200)
    }

    async refresh(req: FastifyRequest, res: FastifyReply) {
        const refreshToken = req.cookies['refreshToken'];
        const refreshedData = await this.authService.refresh(refreshToken);
        res.setCookie('refreshToken', refreshedData.refreshToken, REFRESH_COOKIE_SETTINGS);
        return { accessToken: refreshedData.accessToken }
    }
}