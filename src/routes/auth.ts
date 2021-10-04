import { Router } from 'express'
import passport from 'passport'

export default Router()
  .post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureMessage: true,
      session: true,
    }),
  )
  .get('/logout', async (req, res) => {
    req.logout()
    res.redirect('/')
  })
