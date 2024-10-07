import { Request } from 'express'
import { getNameFromFullname, handleuploadImage, handleuploadVideo } from '~/utils/file'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import path from 'path'
import fs from 'fs'
import { envConfig, isProduction } from '~/constants/config'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Other'
class MediasService {
  async handleuploadImageService(req: Request) {
    const files = await handleuploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        const info = await sharp(file.filepath).jpeg().toFile(newPath)
        fs.unlinkSync(file.filepath)
        return {
          url: isProduction
            ? `${envConfig.host}/static/image/${newName}.jpg`
            : `http://localhost:${envConfig.port}/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
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
