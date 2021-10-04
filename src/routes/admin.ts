import { Router } from 'express'
import * as api from '../api'

// dev cleanup
export default Router()
  .get('/users', async (_req, res) => {
    await api.deleteAllUsers()
    res.send({ msg: 'ok' })
  })
  .get('/docs', async (_req, res) => {
    await api.deleteAllDocuments()
    res.send({ msg: 'ok' })
  })
