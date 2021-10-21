import { Module } from '@nestjs/common'
import { DocumentUpdatesGateway } from './document-updates.gateway'

@Module({
  providers: [DocumentUpdatesGateway],
})
export class DocumentUpdatesModule {}
