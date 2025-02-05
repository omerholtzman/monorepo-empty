import Fastify from 'fastify';

const server = Fastify();

server.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

export default server;
