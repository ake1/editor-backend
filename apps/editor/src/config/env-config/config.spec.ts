import config from './config'

describe('config', () => {
  it('loads config', () => {
    const ret = config()

    expect(ret.NODE_ENV).toEqual('test')
    expect(ret.PORT).toEqual(1234)
    expect(ret.DB_URI).toBeDefined()
    expect(ret.DB_NAME).toEqual('editor2')
    expect(ret.DB_COLL_DOCUMENTS).toEqual('documents')
    expect(ret.DB_COLL_USERS).toEqual('users')
    expect(ret.PASSWORD_DELIMITER).toEqual(':')
    expect(ret.JWT_SECRET).toBeDefined()
    expect(ret.JWT_EXPIRATION_SECONDS).toEqual(3600)
    expect(ret.JWT_COOKIE_NAME).toEqual('accessToken')
    expect(ret.CI).toBeDefined()
  })
})
