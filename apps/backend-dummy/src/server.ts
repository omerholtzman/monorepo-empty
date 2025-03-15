import Fastify from 'fastify';
import { orderSchema } from '@9920/schemas/orders';

const server = Fastify();

server.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

server.post('/order', async (request, reply) => {
    const order = orderSchema.parse(request.body);
    return reply.send(order);
})

server.addHook('onError', (request, reply, error) => {
  console.error('Fastify encountered an error:', error);
});

export default server;
