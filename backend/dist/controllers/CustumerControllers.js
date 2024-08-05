"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCustomerController = exports.GetCustomerByTokenController = exports.DeleteCustomersController = exports.CreateCustomersController = exports.EditCustomersController = void 0;
const CustomersService_1 = require("../services/CustomersService");
class CreateCustomersController {
    async handle(request, reply) {
        const customerService = new CustomersService_1.CreateCustomersService();
        const { name, email, password, acesso, token, imagem, partner } = request.body;
        try {
            const customer = await customerService.execute({ name, email, password, acesso, token, imagem, partner });
            reply.send(customer);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.CreateCustomersController = CreateCustomersController;
class DeleteCustomersController {
    async handle(request, reply) {
        const { id } = request.query;
        const customerService = new CustomersService_1.DeleteCustomersService();
        try {
            const customer = await customerService.execute({ id });
            reply.send(customer);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.DeleteCustomersController = DeleteCustomersController;
class GetCustomerByTokenController {
    async handle(request, reply) {
        const { token } = request.body;
        const getCustomerByTokenService = new CustomersService_1.GetCustomerByTokenService();
        try {
            const customer = await getCustomerByTokenService.execute(token);
            reply.send(customer);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.GetCustomerByTokenController = GetCustomerByTokenController;
class ListCustomerController {
    async handle(request, reply) {
        const listCustomersService = new CustomersService_1.ListCustomersService();
        try {
            const customers = await listCustomersService.execute();
            reply.send(customers);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.ListCustomerController = ListCustomerController;
class EditCustomersController {
    async handle(request, reply) {
        const { id, name, email, password, acesso, token, imagem, partner } = request.body;
        const editCustomersService = new CustomersService_1.EditCustomersService();
        try {
            const updatedCustomer = await editCustomersService.execute({ id, name, email, password, acesso, token, imagem, partner });
            reply.send(updatedCustomer);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.EditCustomersController = EditCustomersController;
