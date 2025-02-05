import config from './config.js';
import server from './server.js';

const startServer = async () => {
    try {
      await server.listen({ port: config.PORT, host: '0.0.0.0' });
      console.log(`Server is running on http://localhost:${config.PORT}`);
    } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1);
    }
  };

const startApplication = async () => {
  try {
    await startServer();
    handleShutdown();
  } catch (error) {
    console.error('Error during application startup:', error);
    process.exit(1);
  }
};

const handleShutdown = () => {
  process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
  });
};

startApplication();
