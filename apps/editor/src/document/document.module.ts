import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DocumentResolver } from './document.resolver'
import { DocumentService } from './document.service'
import { Document, DocumentSchema } from './schemas/document.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  providers: [DocumentResolver, DocumentService],
})
export class DocumentModule {}
