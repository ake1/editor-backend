import s from 'express-session'

const session = (_opts: { nodeEnv?: string }) =>
  s({
    secret: 'whatever',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: 'none',
    },
  })

export default session
