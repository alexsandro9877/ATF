"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const ImageController_1 = require("../controllers/ImageController");
const imageController = new ImageController_1.ImageController();
async function routes(app) {
    // Outras rotas...
    // Rota para upload de imagem
    //@ts-ignore
    app.post('/upload', { preHandler: upload.single('file') }, imageController.uploadImage);
    // Rota para obter dados da imagem
    //@ts-ignore
    app.get('/images/:id', imageController.getImageData);
    // Outras rotas...
}
