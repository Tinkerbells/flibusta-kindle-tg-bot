import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createBooksPaginationMenu } from '../helpers/createBooksPaginationMenu'
import { bookInfoMenu } from './bookInfoMenu'

export const booksMenu = new Menu<BotContext>('books')

booksMenu.dynamic((ctx, range) => createBooksPaginationMenu(ctx, range))

booksMenu.register(bookInfoMenu)
