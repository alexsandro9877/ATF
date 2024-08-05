"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleRoutes = googleRoutes;
async function googleRoutes(app) {
    app.get('/login/google/callback', async (request, reply) => {
        const token = await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
        const userData = await fetchUserData(token.access_token);
        // Verifica se o usuário já existe no banco de dados e cria um novo JWT
        const accessToken = app.jwt.sign({ username: userData.name }, { expiresIn: '15m' });
        const refreshToken = app.jwt.sign({ username: userData.name }, { expiresIn: '7d' });
        // Envia o JWT para o cliente
        reply.send({ accessToken, refreshToken, userData });
    });
}
async function fetchUserData(accessToken) {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return response.json();
}
