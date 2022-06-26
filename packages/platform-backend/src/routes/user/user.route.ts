import { UserController } from "@controllers/user.controller";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export const userRoute = (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
    fastify.post<{ Body: { userName: string; userEmail: string; userPassword: string } }>('/signUp', async (req, res) => {
        const { userEmail, userName, userPassword } = req.body;
        const userController = req.diScope.resolve<UserController>('userController');
        return await userController.signUp(userName, userEmail, userPassword);
    });

    fastify.post('/signIn',(req, res) => {
        const userController = req.diScope.resolve('userController');

    });

    fastify.post('/logout', (req, res) => {
        const userController = req.diScope.resolve('userController');

    });

    fastify.get('/refreshToken', (req, res) => {
        const userController = req.diScope.resolve('userController');
        return 'token refreshed';
    });
}