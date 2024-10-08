import express from 'express'
import { Request, Response, NextFunction } from 'express'
import databaseService from '~/services/database.services'
import usersRouter from './routes/users.routes'
import mediasRouter from './routes/medias.routes'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { initFolder } from './utils/file'
import { envConfig } from './constants/config'
import argv from 'minimist'
import { UPLOAD_IMAGE_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
import tweetsRouter from './routes/tweets.routes'
const app = express()
const port = envConfig.port

// Create folder upload if not exist
initFolder()

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexFollowers()
})
app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/tweet', tweetsRouter)
app.use('/static', staticRouter) // serving static file cách 2

// app.use('/static', express.static(UPLOAD_IMAGE_DIR))   // serving static file cách 1

app.use(defaultErrorHandler as any)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
