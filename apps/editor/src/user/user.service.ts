import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CryptoService } from '../crypto/crypto.service'
import { CreateUserInput } from './dto/create-user.input'
import { QueryUserInput } from './dto/query-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UserService {
  constructor(
    private readonly cryptoService: CryptoService,
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async create({ username, password }: CreateUserInput): Promise<UserDocument> {
    const exists = await this.model.exists({ username })
    if (exists) throw Error('Invalid username')
    const hash = await this.cryptoService.hash(password)
    return this.model.create({ username, hash })
  }

  findAll() {
    return this.model.find({})
  }

  findOne(id: string) {
    return this.model.findById(id)
  }

  find({ id, username }: QueryUserInput) {
    if (id) return this.findOne(id)
    else return this.model.findOne({ username })
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const { password, ...rest } = updateUserInput
    const updatedUser: Partial<UserDocument> = rest
    if (password) {
      const hash = await this.cryptoService.hash(password)
      updatedUser.hash = hash
    }

    await this.model.updateOne({ _id: id }, updatedUser)
  }

  async remove(id: string) {
    await this.model.deleteOne({ _id: id })
  }
}
