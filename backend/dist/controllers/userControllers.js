"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersAccountController = exports.GetUserByEmailController = exports.ListUsersController = exports.GetUserByIdController = exports.DeleteUsersController = exports.CreateUsersController = void 0;
const UsersService_1 = require("../services/UsersService");
class CreateUsersController {
    async handle(request, reply) {
        const createUsersService = new UsersService_1.CreateUsersService();
        try {
            const { name, email, phone, password, picture, status, roles, azp, permissions, visibleRoutes, theme, accountId, } = request.body;
            // Verifica se theme está definido
            if (!theme || !theme.colorPrimary) {
                throw new Error('Dados de tema inválidos');
            }
            const user = await createUsersService.execute({
                name,
                email,
                phone,
                password,
                picture,
                status,
                azp,
                roles,
                permissions,
                visibleRoutes,
                theme,
                accountId,
            });
            reply.send(user);
        }
        catch (error) {
            reply.status(400).send({ message: error });
        }
    }
}
exports.CreateUsersController = CreateUsersController;
class DeleteUsersController {
    async handle(request, reply) {
        const { id } = request.query;
        const userService = new UsersService_1.DeleteUsersService();
        try {
            const result = await userService.execute({ id });
            reply.send(result);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error });
        }
    }
}
exports.DeleteUsersController = DeleteUsersController;
class GetUserByIdController {
    async handle(request, reply) {
        const { id } = request.query;
        const getUserByIdService = new UsersService_1.GetUserByIdService();
        try {
            const user = await getUserByIdService.execute({ id });
            reply.send(user);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error });
        }
    }
}
exports.GetUserByIdController = GetUserByIdController;
class GetUserByEmailController {
    async handle(request, reply) {
        const { email } = request.body;
        const getUserByEmailService = new UsersService_1.GetUserByEmailService();
        try {
            const user = await getUserByEmailService.execute(email);
            reply.status(200).send(user);
        }
        catch (error) {
            reply.status(400).send({ message: error });
        }
    }
}
exports.GetUserByEmailController = GetUserByEmailController;
class ListUsersAccountController {
    async handle(request, reply) {
        const { id } = request.query;
        const listUsersAccountService = new UsersService_1.ListUsersAccountService();
        try {
            const users = await listUsersAccountService.execute({ id });
            reply.send(users);
        }
        catch (error) {
            reply.status(500).send({ message: error });
        }
    }
}
exports.ListUsersAccountController = ListUsersAccountController;
class ListUsersController {
    async handle(request, reply) {
        const listUsersService = new UsersService_1.ListUsersService();
        try {
            const users = await listUsersService.execute();
            reply.send(users);
        }
        catch (error) {
            reply.status(500).send({ message: error });
        }
    }
}
exports.ListUsersController = ListUsersController;
