import { Request } from 'express'
import mime from 'mime'
import { getNameFromFullname, handleuploadImage, handleuploadVideo } from '~/utils/file'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'
import { envConfig, isProduction } from '~/constants/config'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Other'
import { uploadFileToS3 } from '~/utils/s3'
import fsPromise from 'fs/promises'
import { CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3'

class MediasService {
  async handleuploadImageService(req: Request) {
    const files = await handleuploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newFullFilename = `${newName}.jpg`
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, newFullFilename)
        await sharp(file.filepath).jpeg().toFile(newPath)
        const s3Result = await uploadFileToS3({
          filename: 'images/' + newFullFilename,
          filepath: newPath,
          contentType: mime.getType(newPath) as string
        })
        fs.unlinkSync(file.filepath)
        fs.unlinkSync(newPath)
        return {
          url: (s3Result as CompleteMultipartUploadCommandOutput).Location as string,
          type: MediaType.Image
        }
        // return {
        //   url: isProduction
        //     ? `${process.env.HOST}/static/image/${newFullFilename}`
        //     : `http://localhost:${process.env.PORT}/static/image/${newFullFilename}`,
        //   type: MediaType.Image
        // }
      })
    )
    return result
  }

  async handleuploadVideoService(req: Request) {
    const files = await handleuploadVideo(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newPath = path.resolve(UPLOAD_VIDEO_DIR, `${file.newFilename}`)
        return {
          url: isProduction
            ? `${envConfig.host}/static/video/${file.newFilename}`
            : `http://localhost:${envConfig.port}/static/video/${file.newFilename}`,
          type: MediaType.Video
        }
      })
    )
    return result
  }
}

const mediasService = new MediasService()
export default mediasService
