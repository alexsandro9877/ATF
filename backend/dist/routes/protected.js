"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoutes = protectedRoutes;
const CustumerControllers_1 = require("../controllers/CustumerControllers");
const ProductControllers_1 = require("../controllers/ProductControllers");
const mercadoLivreController_1 = require("../controllers/mercadoLivreController");
const AccountControllers_1 = require("../controllers/AccountControllers");
const userControllers_1 = require("../controllers/userControllers");
const ImageController_1 = require("../controllers/ImageController");
const emailController_1 = require("../controllers/emailController");
const sendMessageController_1 = require("../controllers/sendMessageController");
async function protectedRoutes(app) {
    //@ts-ignore
    // proteger rotas jwt
    // app.get("/users", { preHandler: [app.authenticate] } ,async (request: FastifyRequest, reply: FastifyReply) => {
    //     return new ListUsersController().handle(request, reply);
    // });
    // proteger rotas google
    // app.get('/protected-route', { preHandler: [authMiddleware] }, async (request, reply) => {
    //     reply.send({ message: 'Esta é uma rota protegida!' });
    // });
    app.post("/upload", async (request, reply) => {
        return new ImageController_1.ImageController().handle(request, reply);
    });
    app.get('/download/image/:id', async (request, reply) => {
        return new ImageController_1.DownloadImageController().handle(request, reply);
    });
    app.get("/imagem/:id", async (request, reply) => {
        return new ImageController_1.GetImageByIdController().handle(request, reply);
    });
    app.get("/imagem/all/:accountId", async (request, reply) => {
        return new ImageController_1.GetImageByImageIdController().handle(request, reply);
    });
    app.get("/imagem/all", async (request, reply) => {
        return new ImageController_1.ListImageController().handle(request, reply);
    });
    app.delete("/imagem/:id", async (request, reply) => {
        return new ImageController_1.DeleteImageByIdController().handle(request, reply);
    });
    app.get("/users", async (request, reply) => {
        return new userControllers_1.ListUsersController().handle(request, reply);
    });
    app.post("/send-email", async (request, reply) => {
        return new emailController_1.SendEmailController().handle(request, reply);
    });
    app.post("/send-message", async (request, reply) => {
        return new sendMessageController_1.SendMessageController().handle(request, reply);
    });
    app.get("/user/:id", async (request, reply) => {
        return new userControllers_1.GetUserByIdController().handle(request, reply);
    });
    app.get("/user/account/:id", async (request, reply) => {
        return new userControllers_1.ListUsersAccountController().handle(request, reply);
    });
    app.post("/user/email", async (request, reply) => {
        return new userControllers_1.GetUserByEmailController().handle(request, reply);
    });
    app.delete("/user/:id", async (request, reply) => {
        return new userControllers_1.DeleteUsersController().handle(request, reply);
    });
    app.post("/user", async (request, reply) => {
        return new userControllers_1.CreateUsersController().handle(request, reply);
    });
    app.post("/customer", async (request, reply) => {
        return new CustumerControllers_1.CreateCustomersController().handle(request, reply);
    });
    app.put("/customer", async (request, reply) => {
        return new CustumerControllers_1.EditCustomersController().handle(request, reply);
    });
    app.get("/customers", async (request, reply) => {
        return new CustumerControllers_1.ListCustomerController().handle(request, reply);
    });
    app.delete("/customer/:id", async (request, reply) => {
        return new CustumerControllers_1.DeleteCustomersController().handle(request, reply);
    });
    app.post("/product", async (request, reply) => {
        return new ProductControllers_1.CreateProductController().handle(request, reply);
    });
    app.delete("/product", async (request, reply) => {
        return new ProductControllers_1.DeleteProductControllers().handle(request, reply);
    });
    app.get("/product/all", async (request, reply) => {
        return new ProductControllers_1.ListProductController().handle(request, reply);
    });
    app.get("/product/:id", async (request, reply) => {
        return new ProductControllers_1.GetProductByIdController().handle(request, reply);
    });
    app.post("/account", async (request, reply) => {
        return new AccountControllers_1.CreateAccountsController().handle(request, reply);
    });
    app.put("/account", async (request, reply) => {
        return new AccountControllers_1.EditAccountsController().handle(request, reply);
    });
    app.delete("/account/:id", async (request, reply) => {
        return new AccountControllers_1.DeleteAccountsController().handle(request, reply);
    });
    app.get("/accounts/all", async (request, reply) => {
        return new AccountControllers_1.ListAccountsController().handle(request, reply);
    });
    app.get("/account/:id", async (request, reply) => {
        return new AccountControllers_1.GetAccountByIdController().handle(request, reply);
    });
    app.get("/account/customer/:id", async (request, reply) => {
        return new AccountControllers_1.GetAccountByCustomerIdController().handle(request, reply);
    });
    app.get('/api/mercadoLivre/applicationInfo', async (request, reply) => {
        return (0, mercadoLivreController_1.getApplicationInfo)(request, reply);
    });
}
