import http from 'http'
import mongoose from 'mongoose'

export default function handleGracefulShutdown (server: http.Server): void {
    console.log('Closing http server...')
    // Stops the server from accepting new connections and finish existing connections.
    server.close(function (err) {
      console.log('Http server closed!')
      if (err) {
        console.error(err)
        process.exit(1)
      }
      mongoose.connection.close(function () {
        console.log('Mongoose connection closed!')
        process.exit(0)
      });
    });
}
