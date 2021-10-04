import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export class HttpException extends Error {
  reason: string

  constructor(public status: StatusCodes, message?: string) {
    super(message)
    Object.setPrototypeOf(this, HttpException.prototype)
    this.reason = getReasonPhrase(status)
  }
}

export class DatabaseException extends Error {
  constructor(message?: string | Error) {
    if (message instanceof Error) super(message.message)
    else super(message)
    Object.setPrototypeOf(this, DatabaseException.prototype)
  }
}
