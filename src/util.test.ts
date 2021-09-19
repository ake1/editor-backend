import { DatabaseException, HttpException } from './util'

describe('HttpException', () => {
  it('has the correct prototype', () => {
    const e = new HttpException(404)
    if (!(e instanceof HttpException))
      throw Error('HttpException has the wrong prototype')
  })
})

describe('DatabaseException', () => {
  it('has the correct prototype', () => {
    const e = new DatabaseException('missing db')
    if (!(e instanceof DatabaseException))
      throw Error('DatabaseException has the wrong prototype')
  })

  it('accepts Error as arg', () => {
    const e = new DatabaseException(Error('missing db'))
    expect(e.message).toEqual('missing db')
  })
})
