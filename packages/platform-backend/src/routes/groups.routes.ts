import { GroupsController } from "@controllers/groups.controller";
import { authOnly } from "@guards/authOnly";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

export const registerGroupsRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, next: (err?: Error) => void) => {
    const groupsController = fastify.diContainer.resolve<GroupsController>('groupsController');
    fastify.addHook('preHandler', authOnly);

    fastify.post('/groups/create', groupsController.createGroup);
    fastify.post('/groups/:groupId/delete', groupsController.deleteGroup);
    fastify.post('/groups/:groupId/users/add', groupsController.addUsersToGroup);
    fastify.post('/groups/:groupId/users/remove', groupsController.removeUsersFromGroup);

    next();
}