import express from 'express'
import { Request, Response, NextFunction } from 'express'
import databaseService from '~/services/database.services'
import usersRouter from './routes/users.routes'
import { defaultErrorHandler } from './middlewares/error.middlewares'
const app = express()
const port = 3000
databaseService.connect()
app.use(express.json())
app.use('/users', usersRouter)
app.use(defaultErrorHandler as any)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
