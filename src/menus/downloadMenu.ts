import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createDownloadMenu } from '../helpers/createDownloadMenu'

export const downloadMenu = new Menu<BotContext>('download-menu')

downloadMenu.dynamic((ctx, range) => createDownloadMenu(ctx, range))
