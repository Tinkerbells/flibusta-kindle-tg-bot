import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createBookInfoMenu } from '../helpers/createBookInfoMenu'

export const bookIfnoMenu = new Menu<BotContext>('book-info-menu')

bookIfnoMenu.dynamic((ctx, range) => createBookInfoMenu(ctx, range))
