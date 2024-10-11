import { Request } from 'express'
import { TokenPayload } from '~/models/requests/User.requests'
import Tweet from './models/schemas/Tweet.schema'
import User from './models/schemas/User.schema'
// mở rộng tham số của các thư viện, ở đây là thêm tham số user cho kiểu Request của thư viện express
declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
    decoded_email_verify_token?: TokenPayload
    tweet?: Tweet
  }
}
