import { AuthService } from "@services/auth.service";
import { FastifyReply, FastifyRequest } from "fastify";

const REFRESH_COOKIE_SETTINGS =  { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true };

export class AuthController {
    private authService: AuthService;

    constructor({ authService }: { authService: AuthService }) {
        this.authService = authService;
    }

    signIn = async (req: FastifyRequest<{ Body: { userEmail: string; userPassword: string } }>, res: FastifyReply) => {
        const { userEmail, userPassword } = req.body;
        const { accessToken, refreshToken } = await this.authService.signIn(userEmail, userPassword);
        res.setCookie('refreshToken', refreshToken,REFRESH_COOKIE_SETTINGS);
        return { accessToken };
    }

    signUp = async (req: FastifyRequest<{ Body: { userEmail: string; userPassword: string } }>, res: FastifyReply) => {
        const { userEmail, userPassword } = req.body;
        const { refreshToken, accessToken } =  await this.authService.signUp(userEmail, userPassword);
        res.setCookie('refreshToken', refreshToken, REFRESH_COOKIE_SETTINGS);
        return { accessToken};
    }

    logout = async (req: FastifyRequest, res: FastifyReply) => {
        const refreshToken = req.cookies['refreshToken'];
        await this.authService.logout(refreshToken);
        return res.send(200)
    }

    refresh = async(req: FastifyRequest, res: FastifyReply) => {
        const refreshToken = req.cookies['refreshToken'];
        const refreshedData = await this.authService.refresh(refreshToken);
        res.setCookie('refreshToken', refreshedData.refreshToken, REFRESH_COOKIE_SETTINGS);
        return { accessToken: refreshedData.accessToken }
    }
}