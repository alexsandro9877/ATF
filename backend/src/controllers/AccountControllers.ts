import { FastifyRequest, FastifyReply } from "fastify";
import { 
    CreateAccountsService, 
    DeleteAccountsService, 
    GetAccountByCustomerIdService, 
    GetAccountByIdService, 
    ListAccountsService,
    EditAccountsService 
} from '../services/AccountsService';

class CreateAccountsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const accountService = new CreateAccountsService();
        const { name, aplication, routes, customerId } = request.body as {
            name: string;
            aplication: string;
            routes: string[];
            customerId: string;
        };

        try {
            const account = await accountService.execute({ name, aplication, routes, customerId });
            reply.send(account);
        } catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}

class DeleteAccountsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const accountService = new DeleteAccountsService();

        try {
            const account = await accountService.execute({ id });
            reply.send(account);
        } catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}

class GetAccountByIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const getAccountByIdService = new GetAccountByIdService();

        try {
            const account = await getAccountByIdService.execute(id);
            reply.send(account);
        } catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}

class GetAccountByCustomerIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const getAccountByIdService = new GetAccountByCustomerIdService();

        try {
            const account = await getAccountByIdService.execute(id);
            reply.send(account);
        } catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}

class ListAccountsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listAccountsService = new ListAccountsService();

        try {
            const accounts = await listAccountsService.execute();
            reply.send(accounts);
        } catch (error) {
            //@ts-ignore
            reply.status(500).send({ message: error.message });
        }
    }
}

class EditAccountsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const accountService = new EditAccountsService();
        // const { id } = request.query as { id: string };
        const { name, aplication, routes, customerId, id } = request.body as {
            id: string;
            name?: string;
            aplication?: string;
            routes?: string[];
            customerId?: string;
        };

        try {
            const account = await accountService.execute({ id, name, aplication, routes, customerId });
            reply.send(account);
        } catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}

export { 
    CreateAccountsController, 
    DeleteAccountsController, 
    GetAccountByIdController, 
    ListAccountsController,
    GetAccountByCustomerIdController,
    EditAccountsController
};
