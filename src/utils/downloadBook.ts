import { DownloaderHelper } from 'node-downloader-helper'
import { BotContext } from '..'
import { env } from '../env/env'

export const downloadBook = async (url: string, ctx: BotContext) => {
  const dl = new DownloaderHelper(url, env.DOWNLOAD_DIR)
  return new Promise((resolve, reject) => {
    dl.on('end', (info) => {
      ctx.session.book.filePath = info.filePath
      ctx.session.book.fileName = info.fileName
      resolve(true)
    })
    dl.on('error', (err) => {
      console.log('Download Failed', err), reject(err)
    })
    dl.start().catch((err) => console.error(err))
  })
}
