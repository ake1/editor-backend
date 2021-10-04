import { ErrorRequestHandler, RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { DatabaseException, HttpException } from '../util/exceptions'

export const notFound: RequestHandler = (_req, _res, next) => {
  next(new HttpException(StatusCodes.NOT_FOUND))
}

export const wrapError: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) next(error)
  if (error instanceof HttpException) {
    res.status(error.status || 500).send({
      errors: [
        {
          status: error.status,
          title: error.reason,
          detail: error.reason,
        },
      ],
    })
  } else if (error instanceof DatabaseException) {
    res.status(500).send({
      errors: [
        {
          status: 500,
          title: 'Database error',
          detail: error.message,
        },
      ],
    })
  }
}
