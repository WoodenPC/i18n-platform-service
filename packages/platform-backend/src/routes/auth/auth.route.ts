import { authOnly } from "@guards/authOnly";
import { AuthService } from "@services/auth.service";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export const authRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
    fastify.post<{ Body: { userEmail: string; userPassword: string } }>('/auth/signUp', async (req, res) => {
        const { userEmail, userPassword } = req.body;
        const authService = req.diScope.resolve<AuthService>('authService');
        
        const { refreshToken, accessToken, user } =  await authService.signUp(userEmail, userPassword);
        res.setCookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return {user, refreshToken, accessToken};
    });

    fastify.post<{ Body: { userEmail: string; userPassword: string } }>('/auth/signIn', async (req, res) => {
        const { userEmail, userPassword } = req.body;
        const authService = req.diScope.resolve<AuthService>('authService');
        const { accessToken, refreshToken, user } = await authService.signIn(userEmail, userPassword);
        res.setCookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return { accessToken, refreshToken, user };
    });

    fastify.post('/auth/logout', async (req, res) => {
        const refreshToken = req.cookies['refreshToken'];
        const authService = req.diScope.resolve<AuthService>('authService');
        await authService.logout(refreshToken);
        return res.send()
    });

    fastify.get('/auth/refresh', async (req, res) => {
        const refreshToken = req.cookies['refreshToken'];
        const authService = req.diScope.resolve<AuthService>('authService');
        const refreshedData = await authService.refresh(refreshToken);
        res.setCookie('refreshToken', refreshedData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.send()
    });

    fastify.get('/auth/user', { preHandler: [authOnly] }, (req) => {
        const authService = req.diScope.resolve<AuthService>('authService');
        console.log(req.user.id);
        return authService.getUserById(req.user.id);
    })
}