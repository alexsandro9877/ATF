"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
//uuid gera valor aleatorio.
const authMiddleware = async (request, reply) => {
    try {
        await request.jwtVerify();
        // const authorizationHeader = request.headers.authorization;
        // if (!authorizationHeader) {
        //     reply.status(401).send({ error: 'Missing authorization header' });
        //     return;
        // }
        // const token = authorizationHeader.split(' ')[1];
        // if (!token) {
        //     reply.status(401).send({ error: 'Invalid authorization header format' });
        //     return;
        // }
        // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!);
        // const ticket = await client.verifyIdToken({
        //     idToken: token,
        //     audience: process.env.GOOGLE_CLIENT_ID!,
        // });
        // const payload = ticket.getPayload();
        // request.user = payload; // Attach the user payload to the request object
    }
    catch (err) {
        request.log.error(err);
        reply.status(401).send({ error: 'Authentication failed' });
    }
};
exports.authMiddleware = authMiddleware;
