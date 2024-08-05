import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductProps, CreateProductService ,GetProductByIdService,DeleteProductService,ListProductsService} from "../services/ProductService";

class CreateProductController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createProductService = new CreateProductService();

    const {
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
      accountId,
    } = request.body as CreateProductProps;

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
    } catch (error) {
      reply.status(400).send({ error });
    }
  }
}

class DeleteProductControllers {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }
        const customerService = new DeleteProductService();
        const customer = await customerService.execute({ id });
        reply.send(customer);
    }
}

class ListProductController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listCustomersService = new ListProductsService();
        
        try {
            const product = await listCustomersService.execute();
            reply.send(product);
        } catch (error) {
            reply.status(500).send({ error});
        }
    }
}

class GetProductByIdController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }
        const getCustomerByIdService = new GetProductByIdService();

        try {
            const customer = await getCustomerByIdService.execute(id);
            reply.send(customer);
        } catch (error) {
            reply.status(400).send({ error  });
        }
    } 
}

export { DeleteProductControllers, CreateProductController,ListProductController,GetProductByIdController };
