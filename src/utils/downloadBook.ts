import { rejects } from 'assert'
import { DownloaderHelper } from 'node-downloader-helper'
import { resolve } from 'path'
import { BotContext } from '..'
import { env } from '../env/env'

export const downloadBook = async (url: string, ctx: BotContext) => {
  const dl = new DownloaderHelper(url, env.DOWNLOAD_DIR)
  return new Promise((resolve, reject) => {
    dl.on('end', (info) => {
      const path = info.filePath
      ctx.session.bookFilePath = path
      ctx.session.bookFileName = info.fileName
      resolve(true)
    })
    dl.on('error', (err) => {
      console.log('Download Failed', err), reject(err)
    })
    dl.start().catch((err) => console.error(err))
  })
}
