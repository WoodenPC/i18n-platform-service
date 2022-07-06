import { authOnly } from "@guards/authOnly";
import { AuthService } from "@services/auth.service";
import { FastifyInstance } from "fastify";

const REFRESH_COOKIE_SETTINGS =  { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true };

export const authRoute = (fastify: FastifyInstance) => {
    fastify.post<{ Body: { userEmail: string; userPassword: string } }>('/auth/signUp', async (req, res) => {
        const { userEmail, userPassword } = req.body;
        const authService = req.diScope.resolve<AuthService>('authService');
        const { refreshToken, accessToken } =  await authService.signUp(userEmail, userPassword);
        res.setCookie('refreshToken', refreshToken, REFRESH_COOKIE_SETTINGS);
        return { accessToken};
    });

    fastify.post<{ Body: { userEmail: string; userPassword: string } }>('/auth/signIn', async (req, res) => {
        const { userEmail, userPassword } = req.body;
        const authService = req.diScope.resolve<AuthService>('authService');
        const { accessToken, refreshToken } = await authService.signIn(userEmail, userPassword);
        res.setCookie('refreshToken', refreshToken,REFRESH_COOKIE_SETTINGS);
        return { accessToken };
    });

    fastify.post('/auth/logout', async (req, res) => {
        const refreshToken = req.cookies['refreshToken'];
        const authService = req.diScope.resolve<AuthService>('authService');
        await authService.logout(refreshToken);
        return res.send(200)
    });

    fastify.get('/auth/refresh', async (req, res) => {
        const refreshToken = req.cookies['refreshToken'];
        const authService = req.diScope.resolve<AuthService>('authService');
        const refreshedData = await authService.refresh(refreshToken);
        res.setCookie('refreshToken', refreshedData.refreshToken, REFRESH_COOKIE_SETTINGS);
        return { accessToken: refreshedData.accessToken }
    });

    fastify.get('/auth/user', { preHandler: [authOnly] }, (req) => {
        const authService = req.diScope.resolve<AuthService>('authService');
        return authService.getUserById(BigInt(req.user.id));
    })
}