"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleRoutes = googleRoutes;
const google_auth_library_1 = require("google-auth-library");
async function googleRoutes(app) {
    app.get('/login/google/callback', async (request, reply) => {
        try {
            const token = await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
            if (!token || !token.token || !token.token.id_token) {
                reply.status(400).send('Invalid token response');
                return;
            }
            const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token.token.id_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                reply.status(400).send('Invalid payload');
                return;
            }
            // Aqui você pode redirecionar para a página principal do frontend com o token
            const accessToken = token.token.access_token;
            reply.redirect(`https://localhost:5173/login/success?token=${accessToken}`);
            console.log('Redirecting to:', accessToken); // Log the redirection URL
        }
        catch (err) {
            app.log.error(err);
            reply.status(500).send('Authentication failed');
        }
    });
}
