import { UnauthorizedException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { DocumentService } from './document.service'
import { CreateDocumentInput } from './dto/create-document.input'
import { UpdateDocumentInput } from './dto/update-document.input'
import { Document } from './entities/document.entity'

@Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @Mutation(() => Document)
  @UseGuards(GqlAuthGuard)
  createDocument(
    @CurrentUser() user: { id: string },
    @Args('createDocumentInput') createDocumentInput: CreateDocumentInput,
  ) {
    return this.documentService.create(user.id, createDocumentInput)
  }

  @Query(() => [Document], { name: 'documents' })
  @UseGuards(GqlAuthGuard)
  async findAll(@CurrentUser() user: { id: string }) {
    const all = await this.documentService.findAll()
    return all.filter((d) => d.hasPermission.includes(user.id))
  }

  @Query(() => Document, { name: 'document' })
  @UseGuards(GqlAuthGuard)
  async findOne(
    @CurrentUser() user: { id: string },
    @Args('id', { type: () => String }) id: string,
  ) {
    const doc = await this.documentService.findOne(id)
    if (!doc.hasPermission.includes(user.id)) throw new UnauthorizedException()
    return doc
  }

  @Mutation(() => Document)
  @UseGuards(GqlAuthGuard)
  async updateDocument(
    @CurrentUser() user: { id: string },
    @Args('updateDocumentInput') updateDocumentInput: UpdateDocumentInput,
  ) {
    const doc = await this.documentService.findOne(updateDocumentInput.id)
    if (!doc.hasPermission.includes(user.id)) throw new UnauthorizedException()
    if (!updateDocumentInput.hasPermission?.includes(user.id)) {
      if (Array.isArray(updateDocumentInput.hasPermission))
        updateDocumentInput.hasPermission.push(user.id)
      else updateDocumentInput.hasPermission = [user.id]
    }
    return this.documentService.update(
      updateDocumentInput.id,
      updateDocumentInput,
    )
  }

  @Mutation(() => Document)
  @UseGuards(GqlAuthGuard)
  async removeDocument(
    @CurrentUser() user: { id: string },
    @Args('id', { type: () => String }) id: string,
  ) {
    const doc = await this.documentService.findOne(id)
    if (!doc.hasPermission.includes(user.id)) throw new UnauthorizedException()
    await this.documentService.remove(id)
    return doc
  }
}
