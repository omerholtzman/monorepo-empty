import Fastify from 'fastify';
import { orderSchema } from '@9920/schemas/orders';

const server = Fastify();

// Health check route
server.get('/healthcheck', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

server.post('/order', async (request, reply) => {
    const order = orderSchema.parse(request.body);
    return { status: 'ok' }
})

// Start the server
const startServer = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:3000');
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();