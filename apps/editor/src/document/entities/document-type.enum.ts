import { registerEnumType } from '@nestjs/graphql'

export enum DocumentType {
  JAVASCRIPT = 'JAVASCRIPT',
  HTML = 'HTML',
}

registerEnumType(DocumentType, {
  name: 'DocumentType',
})
