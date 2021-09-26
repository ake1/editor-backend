import supertest from 'supertest'
import app from './app'
import getDb from './get-db'

describe('/', () => {
  it('returns 200, correct body', async () => {
    await supertest(app)
      .get('/')
      .expect(200)
      .then((b) => {
        expect(b.body).toEqual({ some: 'json' })
      })
  })
})

describe('/editor', () => {
  const endpoint = '/editor'

  beforeAll(async () => {
    const db = await getDb()
    await db.drop()
    await db.done()
  })

  it('returns empty array', async () => {
    await supertest(app)
      .get(endpoint)
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBeTruthy()
        expect(body.length).toBe(0)
      })
  })

  describe('crud + list', () => {
    let id = ''
    const doc = { title: 'foo', content: 'bar' }

    it('creates a document', async () => {
      await supertest(app)
        .post(endpoint)
        .send(doc)
        .expect(201)
        .then(({ body }) => expect(body.insertedId).toBeDefined())
    })

    it('sees document in list', async () => {
      await supertest(app)
        .get(endpoint)
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toEqual(1)
          const doc = body[0]
          expect(doc._id).toBeDefined()
          id = doc._id
        })
    })

    it('gets newly created document', async () => {
      await supertest(app)
        .get(endpoint + `/${id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body._id).toEqual(id)
          expect(body.title).toEqual(doc.title)
          expect(body.content).toEqual(doc.content)
        })
    })

    it('changes title and content of document', async () => {
      await supertest(app)
        .put(endpoint)
        .send({ _id: id, title: 'not_foo', content: 'not_bar' })
        .expect(204)
    })

    it('sees changes persisted', async () => {
      await supertest(app)
        .get(endpoint + `/${id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body._id).toEqual(id)
          expect(body.title).toEqual('not_foo')
          expect(body.content).toEqual('not_bar')
        })
    })

    it('deletes document', async () => {
      await supertest(app)
        .delete(endpoint + `/${id}`)
        .expect(204)
    })

    it('sees document deleted', async () => {
      await supertest(app)
        .get(endpoint + `/${id}`)
        .expect(404)
    })
  })
})
