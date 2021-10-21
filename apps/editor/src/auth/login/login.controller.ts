import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { Env } from '../../config/env-config/config'
import { AuthService } from '../auth.service'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { LocalAuthGuard } from '../guards/local-auth.guard'

@Controller('auth')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Res() res: Response, @Req() req: any) {
    const cookie = this.authService.getToken(req.user)

    const expires = new Date(
      new Date().getTime() +
        this.configService.get('JWT_EXPIRATION_SECONDS') * 1000,
    )

    res.cookie(this.configService.get('JWT_COOKIE_NAME'), cookie, {
      expires,
      sameSite: 'strict',
      httpOnly: true,
    })

    return res.send({ status: 'ok' })
  }

  @Get('logout')
  @HttpCode(204)
  logout(@Res() res: Response) {
    res.clearCookie(this.configService.get('JWT_COOKIE_NAME'))
    return res.send()
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user
  }
}
