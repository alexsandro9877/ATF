"use strict";
// src/routes/routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const auth_1 = require("../routes/auth");
const protected_1 = require("../routes/protected");
async function routes(app) {
    // Rota de proteção para gerar token
    app.register(auth_1.authRoutes);
    // Rotas protegidas
    app.register(protected_1.protectedRoutes);
}
