import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateUsersProps {
    name: string;
    email: string;
    phone: string;
    password: string;
    picture: string;
  status: boolean;
  azp:string;
    roles: string[];
    permissions: string[];
    visibleRoutes: string[];
    theme: {
        colorPrimary: string;
        colorInfo: string;
        colorTextBase: string;
        colorBgBase: string;
        colorTextTertiary: string;
        colorTextSecondary: string;
    };
    accountId: string;
}

class CreateUsersService {
    async execute(userData: CreateUsersProps): Promise<User> {
        try {
            const createdUser = await prisma.user.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    password: userData.password,
                    status: userData.status,
                    picture: userData.picture,
                    azp:userData.azp,
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
                    accountId : userData.accountId

                   
                },
                include: {
                    theme: true,
                            
                },
            });

            return createdUser;
        } catch (error) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }
}

interface GetUserByIdProps {
    id: string;
}

class ListUsersService {
    async execute() {
        try {
            const users = await prisma.user.findMany({
                include: {
                    theme: true,
                },
            });
            return users;
        } catch (error) {
            throw new Error("Erro ao listar os usuários.");
        }
    }
}

class ListUsersAccountService {
    async execute({ id }: GetUserByIdProps) {
        try {
            const users = await prisma.user.findMany({
                where : {accountId : id},
                include: {
                    theme: true
                },
            });
            return users;
        } catch (error) {
            throw new Error("Erro ao listar os usuários.");
        }
    }
}

class GetUserByIdService {
    async execute({ id }: GetUserByIdProps) {
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
        } catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
    }
}

class GetUserByEmailService {
    async execute(email: string) {
        if (!email) {
            throw new Error("azp não fornecido.");
        }

        try {
            const user = await prisma.user.findFirst({
                where: {
                email:email    
                }
            });

            if (!user) {
                throw new Error("Usuário não encontrado para o azp fornecido.");
            }

            return user;
        } catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
    }
}


class DeleteUsersService {
    async execute({ id }: GetUserByIdProps) {
        try {
            const user = await prisma.user.delete({
               where: { id },
                include: {
                    theme: true,
                },
            });

            return { message: `${id} deletado com sucesso!` };
        } catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error.message}`);
        }
    }
}

export { CreateUsersService, ListUsersService, GetUserByIdService, DeleteUsersService,GetUserByEmailService,ListUsersAccountService };

