import app from './app.js';
import { env } from './config/env.js';

/**
 * Bootstraps the HTTP Server with graceful shutdown handling.
 */
async function bootstrap(): Promise<void> {
  const server = app.listen(env.PORT, () => {
    console.log(`🚀 API Server running in ${env.NODE_ENV} mode on http://localhost:${env.PORT}`);
  });

  const shutdown = (signal: string): void => {
    console.log(`\n[Server] Received ${signal}. Starting graceful shutdown...`);

    // Stop accepting new connections
    server.close((err?: Error) => {
      if (err) {
        console.error('[Server] Error during graceful shutdown:', err);
        process.exit(1);
      }
      console.log('[Server] Closed all active connections successfully. Shutdown complete.');
      process.exit(0);
    });

    // Set a force shutdown timeout (10 seconds) to prevent hanging processes
    const forceShutdownTimeout = 10000;
    setTimeout(() => {
      console.warn(
        `[Server] Graceful shutdown timed out after ${forceShutdownTimeout}ms. Forcing process exit...`,
      );
      process.exit(1);
    }, forceShutdownTimeout).unref(); // Prevent timer from keeping the process alive
  };

  // Register termination signal handlers
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((error: unknown) => {
  console.error('[Bootstrap] Fatal error starting the application:', error);
  process.exit(1);
});
