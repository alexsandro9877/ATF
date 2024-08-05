import { FastifyRequest, FastifyReply } from "fastify";
import { 
    CreateCustomersService, 
    DeleteCustomersService, 
    EditCustomersProps, 
    EditCustomersService, 
    GetCustomerByTokenService, 
    ListCustomersService 
} from '../services/CustomersService';

class CreateCustomersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const customerService = new CreateCustomersService();

        const { name, email, password, acesso, token, imagem, partner } = request.body as {
            name: string;
            email: string;
            password: string;
            acesso: string[];
            token: string;
            imagem: string[];
            partner: string[];
        };
        try {
            const customer = await customerService.execute({ name, email, password, acesso, token, imagem, partner });
            reply.send(customer);
        } catch (error) {
                    //@ts-ignore
                    reply.status(400).send({ message:error.message });
        }
    }
}

class DeleteCustomersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const customerService = new DeleteCustomersService();
        try {
            const customer = await customerService.execute({ id });
            reply.send(customer);
        } catch (error) {
            //@ts-ignore
            reply.status(400).send({ message:error.message });
        }
    }
}

class GetCustomerByTokenController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { token } = request.body as { token: string };
        const getCustomerByTokenService = new GetCustomerByTokenService();

        try {
            const customer = await getCustomerByTokenService.execute(token);
            reply.send(customer);
        } catch (error) {
                //@ts-ignore
                reply.status(400).send({ message:error.message });
        }
    }
}

class ListCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listCustomersService = new ListCustomersService();
        try {
            const customers = await listCustomersService.execute();
            reply.send(customers);
        } catch (error) {
                     //@ts-ignore
                     reply.status(400).send({ message:error.message });
        }
    }
}


class EditCustomersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id, name, email, password, acesso, token, imagem, partner } = request.body as EditCustomersProps;

        const editCustomersService = new EditCustomersService();

        try {
            const updatedCustomer = await editCustomersService.execute({ id, name, email, password, acesso, token, imagem, partner });
            reply.send(updatedCustomer);
        } catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}



export { 
    EditCustomersController,
    CreateCustomersController, 
    DeleteCustomersController, 
    GetCustomerByTokenController, 
    ListCustomerController 
};
