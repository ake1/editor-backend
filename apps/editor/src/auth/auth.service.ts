import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CryptoService } from '../crypto/crypto.service'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{ id: string; username: string }> {
    const user = await this.userService.find({ id: null, username })
    if (!user) throw new UnauthorizedException()
    const passMatch = await this.cryptoService.verifyHash(pass, user.hash)
    if (!passMatch) throw new UnauthorizedException()

    return {
      id: user.id,
      username,
    }
  }

  getToken(user: any) {
    const payload = { username: user.username, sub: user.id }
    return {
      token: this.jwtService.sign(payload),
    }
  }
}
