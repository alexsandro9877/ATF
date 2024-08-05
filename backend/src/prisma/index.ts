import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export default prismaClient;
//npx prisma db push ///para criar o esquema no banco e tem que ta o serviço ligado
//npx prisma generate / desliga a aplicação e roda o comando
//tree /F estrutura


///npm cache clean --force Às vezes, o cache do npm pode causar problemas com dependências. Limpar o cache pode resolver problemas de instalação e atualização de pacotes.

//npm cache verify --Isso garantirá que os dados na cache do npm estejam consistentes.
//npm update atualiza -- você pode atualizar todas as dependências usando:

 /// listar as portas netstat -ano
  /// filtra as portas netstat -ano | findstr :3333
  ///encontra o processo tasklist /FI "PID eq 15476"
  /// parar o processo taskkill /PID 15476 /F
