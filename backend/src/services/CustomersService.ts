import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface CreateCustomersProps {
    name: string;
    email: string;
    password: string;
    acesso: string[];
    token: string;
    imagem: string[];
    partner: string[];
}
export interface EditCustomersProps {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    acesso?: string[];
    token?: string;
    imagem?: string[];
    partner?: string[];
}

interface DeleteCustomersProps {
    id: string;
}

class ListCustomersService {
    async execute() {
        try {
            const customers = await prisma.customer.findMany();
            return customers;
        } catch (error) {
            throw new Error("Erro ao listar os clientes.");
        }
    }
}

class GetCustomerByTokenService {
    async execute(token: string) {
        if (!token) {
            throw new Error("Token não fornecido.");
        }

        const customer = await prisma.customer.findFirst({
            where: {
                token: token
            }
        });

        if (!customer) {
            throw new Error("Cliente não encontrado.");
        }

        return customer;
    }
}

class DeleteCustomersService {
    async execute({ id }: DeleteCustomersProps) {
        if (!id) {
            throw new Error("Solicitação inválida!");
        }

        const findCustomer = await prisma.customer.findFirst({
            where: {
                id: id
            }
        });

        if (!findCustomer) {
            throw new Error("Id não encontrado!");
        }

        await prisma.customer.delete({
            where: {
                id: findCustomer.id
            }
        });

        return { message: `${id} deletado com sucesso!` };
    }
}

class CreateCustomersService {
    async execute({ name, email, password, acesso, token, imagem, partner }: CreateCustomersProps) {
        if (!name || !email || !password || !acesso || !token || !imagem || !partner) {
            throw new Error("Envie todos os campos...");
        }

        const customer = await prisma.customer.create({
            data: {
                name,
                email,
                password,
                acesso,
                token,
                imagem,
                partner,
                status: true,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        return customer;
    }
}

class EditCustomersService {
    async execute({ id, name, email, password, acesso, token, imagem, partner }: EditCustomersProps) {
        const customer = await prisma.customer.findUnique({
            where: {
                id: id
            }
        });

        if (!customer) {
            throw new Error("Cliente não encontrado.");
        }

        const updatedCustomer = await prisma.customer.update({
            where: {
                id: id
            },
            data: {
                name: name || customer.name,
                email: email || customer.email,
                password: password || customer.password,
                acesso: acesso || customer.acesso,
                token: token || customer.token,
                imagem: imagem || customer.imagem,
                partner: partner || customer.partner,
                updated_at: new Date()
            }
        });

        return updatedCustomer;
    }
}

export { 
    CreateCustomersService, 
    ListCustomersService, 
    GetCustomerByTokenService, 
    DeleteCustomersService,
    EditCustomersService
};
