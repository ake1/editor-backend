import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

@WebSocketGateway({ path: '/document-updates', transports: ['websocket'] })
export class DocumentUpdatesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger(DocumentUpdatesGateway.name)

  @SubscribeMessage('create')
  async createEvent(
    @MessageBody() room: string,
    @ConnectedSocket() socket: Socket,
  ) {
    await socket.join(room)
    this.logger.log(`Joined room ${room}`)
  }

  @SubscribeMessage('leave')
  async leaveEvent(
    @MessageBody() room: string,
    @ConnectedSocket() socket: Socket,
  ) {
    await socket.leave(room)
    this.logger.log(`Left room ${room}`)
  }

  @SubscribeMessage('doc')
  async docEvent(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    socket.broadcast.to(body.id).emit('doc', body)
    this.logger.log(`Emitted doc to room ${body.id}`)
  }

  afterInit() {
    this.logger.log(`${WebSocketGateway.name} initialized`)
  }

  handleConnection() {
    this.logger.log(`New client connected to ${WebSocketGateway.name}`)
  }

  handleDisconnect() {
    this.logger.log(`Client disconnected from ${WebSocketGateway.name}`)
  }
}
