import { UserController } from "@controllers/user.controller";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export const userRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
    fastify.post<{ Body: { userEmail: string; userPassword: string } }>('/signUp', async (req, res) => {
        const { userEmail, userPassword } = req.body;
        const userController = req.diScope.resolve<UserController>('userController');
        return await userController.signUp(userEmail, userPassword);
    });

    fastify.post<{ Body: { userEmail: string; userPassword: string } }>('/signIn', async (req, res) => {
        const userController = req.diScope.resolve<UserController>('userController');
        const { userEmail, userPassword } = req.body;
        return await userController.signIn(userEmail, userPassword)
    });

    fastify.post<{ Body: { refreshToken: string } }>('/logout', async (req, res) => {
        const { refreshToken } = req.body;
        const userController = req.diScope.resolve<UserController>('userController');
        return await userController.logout(refreshToken)

    });

    fastify.get('/refreshToken', (req, res) => {
        const userController = req.diScope.resolve('userController');
        return 'token refreshed';
    });
}