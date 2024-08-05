import { FastifyRequest, FastifyReply } from 'fastify';

import {
    CreateUsersService,
    DeleteUsersService,
    GetUserByIdService,
    ListUsersService,
    CreateUsersProps,
    GetUserByEmailService,
    ListUsersAccountService
} from '../services/UsersService';


class CreateUsersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const createUsersService = new CreateUsersService();

        try {
            const {
                name,
                email,
                phone,
                password,
                picture,
                status,
                roles,
                azp,
                permissions,
                visibleRoutes,
                theme,
                accountId,
            } = request.body as CreateUsersProps;

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
        } catch (error) {
            reply.status(400).send({ message: error });
        }
    }
}

class DeleteUsersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }
        const userService = new DeleteUsersService();

        try {
            const result = await userService.execute({ id });
            reply.send(result);
        } catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error });
        }
    }
}

class GetUserByIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }
        const getUserByIdService = new GetUserByIdService();

        try {
            const user = await getUserByIdService.execute({ id });
            reply.send(user);
        } catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error });
        }
    }
}

class GetUserByEmailController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email } = request.body as { email: string };
        const getUserByEmailService = new GetUserByEmailService();

        try {
            const user = await getUserByEmailService.execute(email);
            reply.status(200).send(user);
        } catch (error) {
            reply.status(400).send({ message: error });
        }
    }
}
class ListUsersAccountController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }
        const listUsersAccountService = new ListUsersAccountService();

        try {
            const users = await listUsersAccountService.execute({id});
            reply.send(users);
        } catch (error) {
            reply.status(500).send({ message: error });
        }
    }
}

class ListUsersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listUsersService = new ListUsersService();

        try {
            const users = await listUsersService.execute();
            reply.send(users);
        } catch (error) {
            reply.status(500).send({ message: error });
        }
    }
}


export { CreateUsersController, DeleteUsersController, GetUserByIdController, ListUsersController,GetUserByEmailController,ListUsersAccountController };
