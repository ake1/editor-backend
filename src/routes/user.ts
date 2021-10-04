import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as api from '../api'
import { authenticated } from '../mw/authenticated'
import { hash } from '../util/hash'

export default Router()
  .get('/me', authenticated, async (req, res) => {
    const user = await api.getUserByUsername((req.user as any).username)
    res.send({ _id: (user as any)._id, username: user.username })
  })
  .get('/', authenticated, async (_req, res) => {
    const users = await api.listUsers()
    res.send(users)
  })
  .post('/', async (req, res) => {
    const { username, password } = req.body
    const existing = await api.getUserByUsername(username)
    if (existing) {
      throw Error('no')
    }
    const h = await hash(password)
    const user = { username, hash: h }
    const created = await api.createUser(user)
    res.status(StatusCodes.CREATED).send(created)
  })
  .put('/', authenticated, async (req, res) => {
    const user = req.body
    const updated = await api.updateUser(user)
    res.status(StatusCodes.NO_CONTENT).send(updated)
  })
  .delete('/:id', authenticated, async (req, res) => {
    const id = req.params.id
    await api.deleteUser(id)
    res.status(StatusCodes.NO_CONTENT).send({
      data: {
        msg: `${id} deleted.`,
      },
    })
  })
