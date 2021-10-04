import { Request, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as api from '../api'
import { SomeDoc } from '../types'
import { HttpException } from '../util/exceptions'

function ensurePermission(doc: SomeDoc, id: string) {
  if (!doc.hasPermission) {
    doc.hasPermission = [id]
  } else if (!doc.hasPermission.includes(id)) {
    doc.hasPermission.push(id)
  }
}

function getId(req: Request): string {
  return (req.user as any).id
}

export default Router()
  .get('/', async (req, res) => {
    const userId = getId(req)
    const docs = await api.listAll(userId)
    res.send(docs)
  })

  .get('/:id', async (req, res, next) => {
    const id = req.params.id
    const userId = getId(req)
    const doc = await api.getOne(id)
    if (!doc || !doc.hasPermission.includes(userId)) {
      return next()
    } else {
      res.send(doc)
    }
  })

  .post('/', async (req, res) => {
    const doc = req.body
    const userId = getId(req)
    ensurePermission(doc, userId)
    const created = await api.createOne(doc)
    res.status(StatusCodes.CREATED).send(created)
  })

  .put('/', async (req, res, next) => {
    const doc = req.body
    const userId = getId(req)
    const orig = await api.getOne(doc._id)

    if (!orig?.hasPermission.includes(userId)) {
      return next(new HttpException(StatusCodes.UNAUTHORIZED))
    }

    ensurePermission(doc, userId)
    const updated = await api.updateOne(doc)
    res.status(StatusCodes.NO_CONTENT).send(updated)
  })

  .delete('/:id', async (req, res, next) => {
    const id = req.params.id
    const userId = getId(req)
    const orig = await api.getOne(id)

    if (!orig?.hasPermission.includes(userId)) {
      return next(new HttpException(StatusCodes.UNAUTHORIZED))
    }

    await api.deleteOne(id)
    res.status(StatusCodes.NO_CONTENT).send({
      data: {
        msg: `${id} deleted.`,
      },
    })
  })
