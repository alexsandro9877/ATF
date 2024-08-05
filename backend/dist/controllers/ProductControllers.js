"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductByIdController = exports.ListProductController = exports.CreateProductController = exports.DeleteProductControllers = void 0;
const ProductService_1 = require("../services/ProductService");
class CreateProductController {
    async handle(request, reply) {
        const createProductService = new ProductService_1.CreateProductService();
        const { cod_prod, cod_prod_origem, desc_marca, desc_cor, ind_prod_peso, desc_prod, ind_prod_status, images, ean_codes, prices, measures, departmentId, categoryId, subcategoryId, sectionId, groupId, subgroupId, accountId, } = request.body;
        try {
            const product = await createProductService.execute({
                cod_prod,
                cod_prod_origem,
                desc_marca,
                desc_cor,
                ind_prod_peso,
                desc_prod,
                ind_prod_status,
                images,
                ean_codes,
                prices,
                measures,
                departmentId,
                categoryId,
                subcategoryId,
                sectionId,
                groupId,
                subgroupId,
                accountId
            });
            reply.send(product);
        }
        catch (error) {
            reply.status(400).send({ error });
        }
    }
}
exports.CreateProductController = CreateProductController;
class DeleteProductControllers {
    async handle(request, reply) {
        const { id } = request.query;
        const customerService = new ProductService_1.DeleteProductService();
        const customer = await customerService.execute({ id });
        reply.send(customer);
    }
}
exports.DeleteProductControllers = DeleteProductControllers;
class ListProductController {
    async handle(request, reply) {
        const listCustomersService = new ProductService_1.ListProductsService();
        try {
            const product = await listCustomersService.execute();
            reply.send(product);
        }
        catch (error) {
            reply.status(500).send({ error });
        }
    }
}
exports.ListProductController = ListProductController;
class GetProductByIdController {
    async handle(request, reply) {
        const { id } = request.query;
        const getCustomerByIdService = new ProductService_1.GetProductByIdService();
        try {
            const customer = await getCustomerByIdService.execute(id);
            reply.send(customer);
        }
        catch (error) {
            reply.status(400).send({ error });
        }
    }
}
exports.GetProductByIdController = GetProductByIdController;
