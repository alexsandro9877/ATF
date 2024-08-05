"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditAccountsController = exports.GetAccountByCustomerIdController = exports.ListAccountsController = exports.GetAccountByIdController = exports.DeleteAccountsController = exports.CreateAccountsController = void 0;
const AccountsService_1 = require("../services/AccountsService");
class CreateAccountsController {
    async handle(request, reply) {
        const accountService = new AccountsService_1.CreateAccountsService();
        const { name, aplication, routes, customerId } = request.body;
        try {
            const account = await accountService.execute({ name, aplication, routes, customerId });
            reply.send(account);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.CreateAccountsController = CreateAccountsController;
class DeleteAccountsController {
    async handle(request, reply) {
        const { id } = request.query;
        const accountService = new AccountsService_1.DeleteAccountsService();
        try {
            const account = await accountService.execute({ id });
            reply.send(account);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.DeleteAccountsController = DeleteAccountsController;
class GetAccountByIdController {
    async handle(request, reply) {
        const { id } = request.query;
        const getAccountByIdService = new AccountsService_1.GetAccountByIdService();
        try {
            const account = await getAccountByIdService.execute(id);
            reply.send(account);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.GetAccountByIdController = GetAccountByIdController;
class GetAccountByCustomerIdController {
    async handle(request, reply) {
        const { id } = request.query;
        const getAccountByIdService = new AccountsService_1.GetAccountByCustomerIdService();
        try {
            const account = await getAccountByIdService.execute(id);
            reply.send(account);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.GetAccountByCustomerIdController = GetAccountByCustomerIdController;
class ListAccountsController {
    async handle(request, reply) {
        const listAccountsService = new AccountsService_1.ListAccountsService();
        try {
            const accounts = await listAccountsService.execute();
            reply.send(accounts);
        }
        catch (error) {
            //@ts-ignore
            reply.status(500).send({ message: error.message });
        }
    }
}
exports.ListAccountsController = ListAccountsController;
class EditAccountsController {
    async handle(request, reply) {
        const accountService = new AccountsService_1.EditAccountsService();
        // const { id } = request.query as { id: string };
        const { name, aplication, routes, customerId, id } = request.body;
        try {
            const account = await accountService.execute({ id, name, aplication, routes, customerId });
            reply.send(account);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.EditAccountsController = EditAccountsController;
