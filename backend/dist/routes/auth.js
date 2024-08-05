"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const UsersService_1 = require("../services/UsersService");
async function authRoutes(app) {
    app.post('/login', async (request, reply) => {
        const { username } = request.body;
        if (!username) {
            return reply.status(400).send({ message: 'Username and password are required' });
        }
        try {
            const getUserByEmailService = new UsersService_1.GetUserByEmailService();
            const user = await getUserByEmailService.execute(username);
            if (!user) {
                return reply.status(401).send({ message: 'Invalid credentials' });
            }
            if (!user.status) {
                return reply.status(403).send({ message: 'User is blocked' });
            }
            const accessToken = app.jwt.sign({ username }, { expiresIn: '15m' });
            const refreshToken = app.jwt.sign({ username }, { expiresIn: '7d' });
            return reply.send({ accessToken, refreshToken });
        }
        catch (error) {
            app.log.error(error);
            return reply.status(500).send({ message: 'Usuario nao cadastrado' });
        }
    });
    app.post('/refresh', async (request, reply) => {
        const { refreshToken } = request.body;
        if (!refreshToken) {
            return reply.status(400).send({ message: 'Refresh token is required' });
        }
        try {
            const payload = app.jwt.verify(refreshToken);
            const newAccessToken = app.jwt.sign({ username: payload.username }, { expiresIn: '15m' });
            return reply.send({ accessToken: newAccessToken });
        }
        catch (err) {
            return reply.status(401).send({ message: 'Invalid refresh token' });
        }
    });
}
// Implemente essa função conforme necessário
async function verifyPassword(user, password) {
    // Verifique a senha do usuário aqui
    // Retorne true se a senha for válida, caso contrário, retorne false
    return user.password === password; // Exemplo básico, substitua com a lógica de hash/senha real
}
