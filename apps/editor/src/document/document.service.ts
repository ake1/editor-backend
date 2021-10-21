import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateDocumentInput } from './dto/create-document.input'
import { UpdateDocumentInput } from './dto/update-document.input'
import { Document, DocumentDocument } from './schemas/document.schema'

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name)
    private readonly model: Model<DocumentDocument>,
  ) {}

  async create(userId: string, createDocumentInput: CreateDocumentInput) {
    const { title, content, type, comments } = createDocumentInput
    const updated = new Date().toISOString()

    const doc = {
      title,
      content,
      type,
      updated,
      hasPermission: [userId],
      comments: comments ?? [],
    }

    const created = await this.model.create(doc)

    return {
      id: created.id,
      title,
      content,
      type,
      updated,
      hasPermission: [userId],
      comments: comments ?? [],
    }
  }

  findAll() {
    return this.model.find({})
  }

  findOne(id: string) {
    return this.model.findById(id)
  }

  async update(id: string, updateDocumentInput: UpdateDocumentInput) {
    await this.model.updateOne({ _id: id }, updateDocumentInput)
    return this.model.findById(id)
  }

  async remove(id: string) {
    await this.model.deleteOne({ _id: id })
  }
}
