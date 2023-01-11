import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createBookInfoMenu } from '../helpers/createBookInfoMenu'
import { downloadMenu } from './downloadMenu'

export const bookInfoMenu = new Menu<BotContext>('book-info-menu')

bookInfoMenu.dynamic((ctx, range) => createBookInfoMenu(ctx, range))

bookInfoMenu.register(downloadMenu)
