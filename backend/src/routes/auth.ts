import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { GetUserByEmailService } from '../services/UsersService';

export async function authRoutes(app: FastifyInstance) {
    app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        const { username } = request.body as { username: string};

        if (!username ) {
            return reply.status(400).send({ message: 'Username and password are required' });
        }

        try {
            const getUserByEmailService = new GetUserByEmailService();
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
        } catch (error) {
            app.log.error(error);
            return reply.status(500).send({ message: 'Usuario nao cadastrado' });
        }
    });

    app.post('/refresh', async (request: FastifyRequest, reply: FastifyReply) => {
        const { refreshToken } = request.body as { refreshToken: string };

        if (!refreshToken) {
            return reply.status(400).send({ message: 'Refresh token is required' });
        }

        try {
            const payload = app.jwt.verify(refreshToken) as { username: string };
            const newAccessToken = app.jwt.sign({ username: payload.username }, { expiresIn: '15m' });
            return reply.send({ accessToken: newAccessToken });
        } catch (err) {
            return reply.status(401).send({ message: 'Invalid refresh token' });
        }
    });
}

// Implemente essa função conforme necessário
async function verifyPassword(user: any, password: string): Promise<boolean> {
    // Verifique a senha do usuário aqui
    // Retorne true se a senha for válida, caso contrário, retorne false
    return user.password === password; // Exemplo básico, substitua com a lógica de hash/senha real
}
