import { Router } from 'express'
import * as api from '../api'
import { authenticated } from '../mw/authenticated'

export default Router().get('/me', authenticated, async (req, res) => {
  const user = await api.getUserByUsername((req.user as any).username)
  if (user) res.send({ _id: (user as any)._id, username: user.username })
})
