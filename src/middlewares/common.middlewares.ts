import { NextFunction, Request, Response } from 'express'
import { pick } from 'lodash'

//generic, trả về type list key của object kiểu T
type FilterKeys<T> = Array<keyof T>

// đây là cú pháp currying (1 hàm trả về 1 hàm), mục đích để lọc các property hợp lệ thông qua hàm pick của lodash, trả về 1 hàm có kiểu Middleware trong express
export const filterMiddleware =
  <T>(filterKeys: FilterKeys<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKeys)
    next()
  }
