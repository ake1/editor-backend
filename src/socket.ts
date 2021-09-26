import { Server } from 'socket.io'

export default function setupSocket(io: Server) {
  io.sockets.on('connection', (s) => {
    s.on('create', (room) => {
      console.log(s.id, 'joined room', room)
      s.join(room)
    })

    s.on('leave', (room) => {
      console.log(s.id, 'leaving room', room)
      s.leave(room)
    })

    s.on('doc', (d) => {
      d.updated = Date.now()
      console.log(d._id, 'emitting doc')
      s.broadcast.to(d._id).emit('doc', d)
    })
  })
}
