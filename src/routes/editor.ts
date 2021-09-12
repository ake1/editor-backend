import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as api from '../api'

export default Router()
  .get('/', async (_req, res) => {
    const list = await api.listAll()
    res.send(list)
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id
    const list = await api.getOne(id)
    res.send(list)
  })
  .post('/', async (req, res) => {
    const doc = req.body
    const created = await api.createOne(doc)
    res.status(StatusCodes.CREATED).send(created)
  })
  .put('/', async (req, res) => {
    const doc = req.body
    const updated = await api.updateOne(doc)
    res.status(StatusCodes.NO_CONTENT).send(updated)
  })
  .delete('/:id', async (req, res) => {
    const id = req.params.id
    await api.deleteOne(id)
    res.status(StatusCodes.NO_CONTENT).send({
      data: {
        msg: `${id} deleted.`,
      },
    })
  })
