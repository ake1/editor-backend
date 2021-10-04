import app from './app'
import { createServer } from 'http'
import config from './config'
import { Server } from 'socket.io'
import setupSocket from './socket'

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: (o, cb) => {
      cb(null, o)
    },
  },
})

setupSocket(io)

server.listen(config.port, () =>
  console.info(`listening on port ${config.port} with env ${config.nodeEnv}`),
)
