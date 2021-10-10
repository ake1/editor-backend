import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import config from './config'
import { authenticated } from './mw/authenticated'
import { notFound, wrapError } from './mw/error-handling'
import session from './mw/session'
import setupPassport from './passport'
import admin from './routes/admin'
import auth from './routes/auth'
import editor from './routes/editor'
import graphql from './routes/graphql'
import root from './routes/root'
import user from './routes/user'

if (config.nodeEnv !== 'test') setupPassport()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session(config))
app.use(passport.initialize())
app.use(passport.session())

if (config.nodeEnv !== 'test') app.use(morgan('combined'))

app.use(root)
app.use(auth)
app.use('/admin', admin)
app.use('/user', user)
app.use('/editor', authenticated, editor)
app.use('/graphql', graphql)

app.use(notFound)
app.use(wrapError)

export default app
