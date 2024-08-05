
import { FastifyInstance, FastifyReply, FastifyRequest,  } from 'fastify';
import { authMiddleware } from '../middlewares/authMiddleware';
import { CreateCustomersController, EditCustomersController, DeleteCustomersController, ListCustomerController } from "../controllers/CustumerControllers";
import { CreateProductController, DeleteProductControllers, GetProductByIdController, ListProductController } from "../controllers/ProductControllers";
import { getApplicationInfo } from '../controllers/mercadoLivreController';
import { CreateAccountsController ,DeleteAccountsController,EditAccountsController,GetAccountByCustomerIdController,GetAccountByIdController,ListAccountsController } from "../controllers/AccountControllers";
import {CreateUsersController,DeleteUsersController,GetUserByEmailController,GetUserByIdController,ListUsersAccountController,ListUsersController} from "../controllers/userControllers";
import {ImageController,GetImageByIdController,DownloadImageController,DeleteImageByIdController,GetImageByImageIdController,ListImageController} from '../controllers/ImageController';
import { SendEmailController } from '../controllers/emailController';
import { SendMessageController } from '../controllers/sendMessageController';

export async function protectedRoutes(app: FastifyInstance) {

    //@ts-ignore
    // proteger rotas jwt
    // app.get("/users", { preHandler: [app.authenticate] } ,async (request: FastifyRequest, reply: FastifyReply) => {
    //     return new ListUsersController().handle(request, reply);
    // });

    // proteger rotas google
    // app.get('/protected-route', { preHandler: [authMiddleware] }, async (request, reply) => {
    //     reply.send({ message: 'Esta é uma rota protegida!' });
    // });

    
    app.post("/upload", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ImageController().handle(request, reply);
      });
      app.get('/download/image/:id', async (request, reply) => {
        return new DownloadImageController().handle(request, reply);
      });
      app.get("/imagem/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetImageByIdController().handle(request, reply);
      });
      app.get("/imagem/all/:accountId", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetImageByImageIdController().handle(request, reply);
      });
      app.get("/imagem/all", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListImageController().handle(request, reply);
      });
      app.delete("/imagem/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteImageByIdController().handle(request, reply);
      });
    
    
    app.get("/users" ,async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListUsersController().handle(request, reply);
    });
    app.post("/send-email", async (request: FastifyRequest, reply: FastifyReply) => {
        return new SendEmailController().handle(request, reply);
    });
    app.post("/send-message", async (request, reply) => {
        return new SendMessageController().handle(request, reply);
      });
    
    app.get("/user/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetUserByIdController().handle(request, reply);
    });
    app.get("/user/account/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListUsersAccountController().handle(request, reply);
    });
    app.post("/user/email", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetUserByEmailController().handle(request, reply);
    });

    
    app.delete("/user/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteUsersController().handle(request, reply);
    });

    app.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUsersController().handle(request, reply);
    });

    app.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomersController().handle(request, reply);
    });

    app.put("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new EditCustomersController().handle(request, reply);
    });
    app.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomerController().handle(request, reply);
    });

    app.delete("/customer/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomersController().handle(request, reply);
    });

    app.post("/product", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new CreateProductController().handle(request, reply);
    });

    app.delete("/product", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new DeleteProductControllers().handle(request, reply);
    });

    app.get("/product/all", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new ListProductController().handle(request, reply);
    });

    app.get("/product/:id", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new GetProductByIdController().handle(request, reply);
    });

    app.post("/account", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new CreateAccountsController().handle(request, reply);
    });

    app.put("/account", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new EditAccountsController().handle(request, reply);
    });
    app.delete("/account/:id", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new DeleteAccountsController().handle(request, reply);
    });
    app.get("/accounts/all", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new ListAccountsController().handle(request, reply);
    });
    app.get("/account/:id", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new GetAccountByIdController().handle(request, reply);
    });
    app.get("/account/customer/:id", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new GetAccountByCustomerIdController().handle(request, reply);
    });

    app.get('/api/mercadoLivre/applicationInfo', async (request: FastifyRequest, reply: FastifyReply) => {
        return getApplicationInfo(request, reply);
    });
  
}
