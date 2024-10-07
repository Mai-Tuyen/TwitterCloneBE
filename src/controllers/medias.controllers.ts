import { Request, Response, NextFunction } from 'express'
import formidable from 'formidable'
import path from 'path'
import { envConfig } from '~/constants/config'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'
import { handleuploadImage } from '~/utils/file'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.handleuploadImageService(req)
  res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

export const serveImageController = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
    if (err) {
      res.status(HTTP_STATUS.NOT_FOUND).send('Not found url')
    }
  })
}

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.handleuploadVideoService(req)
  res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

export const serveVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, name))
}
