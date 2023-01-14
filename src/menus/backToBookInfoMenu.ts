import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createBackToBookInfo } from '../helpers/createBackToBookInfoMenu'

export const backToBookInfoMenu = new Menu<BotContext>('back-book-info')

backToBookInfoMenu.dynamic((ctx, range) => createBackToBookInfo(ctx, range))


