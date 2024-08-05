"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditAccountsService = exports.DeleteAccountsService = exports.GetAccountByCustomerIdService = exports.GetAccountByIdService = exports.ListAccountsService = exports.CreateAccountsService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ListAccountsService {
    async execute() {
        try {
            const accounts = await prisma.account.findMany({
                include: {
                    customer: true
                }
            });
            if (accounts.length === 0) {
                return ({ message: "Sem contas cadastradas" });
            }
            return accounts;
        }
        catch (error) {
            throw new Error("Erro ao listar as contas: " + error);
        }
    }
}
exports.ListAccountsService = ListAccountsService;
class GetAccountByIdService {
    async execute(id) {
        if (!id) {
            throw new Error("ID não fornecido.");
        }
        try {
            const account = await prisma.account.findUnique({
                where: {
                    id: id
                }
            });
            if (!account) {
                throw new Error("Conta não encontrada para o ID fornecido.");
            }
            return account;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.GetAccountByIdService = GetAccountByIdService;
class DeleteAccountsService {
    async execute({ id }) {
        if (!id) {
            throw new Error("ID não fornecido.");
        }
        try {
            const account = await prisma.account.findUnique({
                where: {
                    id: id
                }
            });
            if (!account) {
                throw new Error(`Conta com ID ${id} não encontrada.`);
            }
            await prisma.account.delete({
                where: {
                    id: id
                }
            });
            return { message: `${id} deletado com sucesso!` };
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.DeleteAccountsService = DeleteAccountsService;
class CreateAccountsService {
    async execute({ name, aplication, routes, customerId }) {
        if (!name || !aplication || !routes || !customerId) {
            throw new Error("Por favor, forneça todos os campos necessários.");
        }
        try {
            const existingAccount = await prisma.account.findFirst({
                where: {
                    name,
                    aplication
                }
            });
            if (existingAccount) {
                throw new Error(`A conta com nome '${name}' e aplicação '${aplication}' já existe.`);
            }
            const accountData = {
                name,
                aplication,
                routes,
                customer: {
                    connect: {
                        id: customerId
                    }
                },
                created_at: new Date(),
                updated_at: new Date()
            };
            const account = await prisma.account.create({
                //@ts-ignore
                data: {
                    ...accountData,
                    customer: {
                        connect: { id: customerId }
                    }
                },
                include: {
                    customer: true
                }
            });
            return account;
        }
        catch (error) {
            //@ts-ignore
            throw new Error(`Erro ao criar a conta: ${error.message}`);
        }
    }
}
exports.CreateAccountsService = CreateAccountsService;
class EditAccountsService {
    async execute({ id, name, aplication, routes, customerId }) {
        if (!id || !name || !aplication || !routes || !customerId) {
            throw new Error("Por favor, forneça todos os campos necessários.");
        }
        try {
            const existingAccount = await prisma.account.findUnique({
                where: { id }
            });
            if (!existingAccount) {
                throw new Error(`Conta com ID ${id} não encontrada.`);
            }
            if (existingAccount.customerId !== customerId) {
                throw new Error("O customerId fornecido não corresponde ao customerId existente.");
            }
            const accountUpdate = {
                name,
                aplication,
                routes,
                customerId,
                updated_at: new Date(),
            };
            const updatedAccount = await prisma.account.update({
                where: { id },
                data: accountUpdate,
                include: {
                    customer: true
                }
            });
            return updatedAccount;
        }
        catch (error) {
            throw new Error(`Erro ao editar a conta: ${error}`);
        }
    }
}
exports.EditAccountsService = EditAccountsService;
class GetAccountByCustomerIdService {
    async execute(id) {
        if (!id) {
            throw new Error("ID não fornecido.");
        }
        try {
            const account = await prisma.account.findMany({
                where: {
                    customerId: id
                }
            });
            if (!account) {
                throw new Error("Conta não encontrada para o ID fornecido.");
            }
            return account;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.GetAccountByCustomerIdService = GetAccountByCustomerIdService;
