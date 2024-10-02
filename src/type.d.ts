import { Request } from 'express'
import { TokenPayload } from '~/models/requests/User.requests'
// mở rộng tham số của các thư viện, ở đây là thêm tham số user cho kiểu Request của thư viện express
declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}
