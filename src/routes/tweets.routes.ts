import { Router } from 'express'
import { createTweetController, getTweetController } from '~/controllers/tweets.controllers'
import { createTweetValidator, tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetsRouter = Router()

/**
 * Description. Create a tweet
 * Path: /
 * Method: POST
 * Header: {Authorization: Bearer <accesstoken>}
 * Body: TweetReqeustBody
 */
tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  wrapRequestHandler(createTweetController)
)

/**
 * Description. Get tweet detail
 * Path: /:tweet_id
 * Method: GET
 * Header: {Authorization: Bearer <accesstoken>
 * Body: TweetReqeustBody
 */
tweetsRouter.get('/:tweet_id', accessTokenValidator, tweetIdValidator, wrapRequestHandler(getTweetController))

export default tweetsRouter
