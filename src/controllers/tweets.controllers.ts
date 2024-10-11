import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { TweetRequestBody } from '~/models/requests/Tweet.request'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsService.createTweet(user_id, req.body)
  res.json({
    message: 'Create Tweet Successfully',
    result
  })
}

export const getTweetController = async (req: Request, res: Response) => {
  // comment vì đã xử lý tweet trong validator rồi
  // const { user_id } = req.decoded_authorization as TokenPayload
  // const result = await tweetsService.getTweet(req.params.tweet_id)
  res.json({
    message: 'Get Tweet Successfully',
    result: req.tweet
  })
}
