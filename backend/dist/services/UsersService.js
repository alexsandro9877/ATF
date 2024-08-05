"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersAccountService = exports.GetUserByEmailService = exports.DeleteUsersService = exports.GetUserByIdService = exports.ListUsersService = exports.CreateUsersService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CreateUsersService {
    async execute(userData) {
        try {
            const createdUser = await prisma.user.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    password: userData.password,
                    status: userData.status,
                    picture: userData.picture,
                    azp: userData.azp,
                    roles: {
                        set: userData.roles,
                    },
                    permissions: {
                        set: userData.permissions,
                    },
                    visibleRoutes: {
                        set: userData.visibleRoutes,
                    },
                    theme: {
                        create: {
                            colorPrimary: userData.theme.colorPrimary,
                            colorInfo: userData.theme.colorInfo,
                            colorTextBase: userData.theme.colorTextBase,
                            colorBgBase: userData.theme.colorBgBase,
                            colorTextTertiary: userData.theme.colorTextTertiary,
                            colorTextSecondary: userData.theme.colorTextSecondary,
                        },
                    },
                    // account : {
                    //     connect: { id: userData.accountId }
                    // },
                    accountId: userData.accountId
                },
                include: {
                    theme: true,
                },
            });
            return createdUser;
        }
        catch (error) {
            throw new Error(`Erro ao criar usuário: ${error}`);
        }
    }
}
exports.CreateUsersService = CreateUsersService;
class ListUsersService {
    async execute() {
        try {
            const users = await prisma.user.findMany({
                include: {
                    theme: true,
                },
            });
            return users;
        }
        catch (error) {
            throw new Error("Erro ao listar os usuários.");
        }
    }
}
exports.ListUsersService = ListUsersService;
class ListUsersAccountService {
    async execute({ id }) {
        try {
            const users = await prisma.user.findMany({
                where: { accountId: id },
                include: {
                    theme: true
                },
            });
            return users;
        }
        catch (error) {
            throw new Error("Erro ao listar os usuários.");
        }
    }
}
exports.ListUsersAccountService = ListUsersAccountService;
class GetUserByIdService {
    async execute({ id }) {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
                include: {
                    theme: true,
                },
            });
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }
            return user;
        }
        catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error}`);
        }
    }
}
exports.GetUserByIdService = GetUserByIdService;
class GetUserByEmailService {
    async execute(email) {
        if (!email) {
            throw new Error("azp não fornecido.");
        }
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error("Usuário não encontrado para o azp fornecido.");
            }
            return user;
        }
        catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error}`);
        }
    }
}
exports.GetUserByEmailService = GetUserByEmailService;
class DeleteUsersService {
    async execute({ id }) {
        try {
            const user = await prisma.user.delete({
                where: { id },
                include: {
                    theme: true,
                },
            });
            return { message: `${id} deletado com sucesso!` };
        }
        catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error}`);
        }
    }
}
exports.DeleteUsersService = DeleteUsersService;
