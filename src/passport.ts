import passport from 'passport'
import { Strategy } from 'passport-local'
import * as api from './api'
import { User } from './types'
import { verify } from './util/hash'

const ERR = 'Incorrect username or password.'

export default function setupPassport() {
  const strategy = new Strategy((username, password, cb) => {
    api
      .getUserByUsername(username)
      .then((user: User | null) => {
        if (!user) {
          return cb(null, false, { message: ERR })
        } else {
          verify(password, user.hash).then((v) => {
            if (!v) {
              return cb(null, false, { message: ERR })
            } else {
              console.log(`successful login of ${user.username}`)
              return cb(null, user)
            }
          })
        }
      })
      .catch((e) => cb(e))
  })

  passport.use(strategy)

  passport.serializeUser((user: any, cb) =>
    process.nextTick(() => cb(null, { id: user._id, username: user.username })),
  )

  passport.deserializeUser((user: any, cb) =>
    process.nextTick(() => cb(null, user)),
  )
}
