import express from 'express'
import { Request, Response, NextFunction } from 'express'
import databaseService from '~/services/database.services'
import usersRouter from './routes/users.routes'
import mediasRouter from './routes/medias.routes'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import cors, { CorsOptions } from 'cors'
import { initFolder } from './utils/file'
import { envConfig, isProduction } from './constants/config'
import { UPLOAD_IMAGE_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
import tweetsRouter from './routes/tweets.routes'
import bookmarkRouter from './routes/bookmarks.routes'
import likesRouter from './routes/likes.routes'
import searchRouter from './routes/search.routes'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
const app = express()
const port = envConfig.port

app.use(helmet())
const corsOptions: CorsOptions = {
  origin: isProduction ? envConfig.clientUrl : '*'
}
app.use(cors(corsOptions))
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
})
app.use(limiter)
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
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarkRouter)
app.use('/likes', likesRouter)
app.use('/search', searchRouter)
app.use('/static', staticRouter) // serving static file cách 2

// app.use('/static', express.static(UPLOAD_IMAGE_DIR))   // serving static file cách 1

app.use(defaultErrorHandler as any)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
