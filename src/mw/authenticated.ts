import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import config from '../config'
import { HttpException } from '../util/exceptions'

export const authenticated: RequestHandler = (req, _res, next) => {
  if (config.nodeEnv === 'test') {
    req.user = { username: 'hi', id: 'id' }
    return next()
  }

  next(
    req.isAuthenticated()
      ? undefined
      : new HttpException(StatusCodes.UNAUTHORIZED),
  )
}
