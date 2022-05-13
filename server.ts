import app from './app'
import http from 'http'
import envs from './src/config/envs'
import connectToDb from './src/config/db'
import handleGracefulShutdown from './src/utils/shutdown_server'
import { serverErrorHandler } from './src/utils/error_handler'
import isError from './src/utils/error_handler'

  
const startServer = (): void => {
  const server = http.createServer(app)
  const port = parseInt(envs.port as string, 10)
  app.set('port', port)
  server.on('error', serverErrorHandler)
  server.listen(port, () => {
    console.log('server listening on port', port)
  })
  // If the Node process ends, handle graceful shutdown
  const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT']
  sigs.forEach((sig) => {
    process.on(sig, () => handleGracefulShutdown(server))
  })
};

connectToDb(envs.db.uri, {
  createIndexOnConnect: true,
  collection: 'items',
  indexSpec: {
    deletedAt: 1,
    name: 1,
    createdAt: 1,
  }
})
  .then((res) => {
    if (!isError(res)) {
      startServer();
    }
})
