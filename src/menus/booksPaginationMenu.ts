import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createBooksPaginationMenu } from '../helpers/createBooksPaginationMenu'
import { bookInfoMenu } from './bookInfoMenu'
import { sendBookMenu } from './sendBookMenu'

export const booksMenu = new Menu<BotContext>('books-menu')

booksMenu.dynamic((ctx, range) => createBooksPaginationMenu(ctx, range))

booksMenu.register(bookInfoMenu)
booksMenu.register(sendBookMenu)
