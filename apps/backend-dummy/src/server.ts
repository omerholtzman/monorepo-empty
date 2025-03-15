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

export default server;
