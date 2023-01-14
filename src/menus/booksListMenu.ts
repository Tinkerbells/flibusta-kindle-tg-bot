import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createBooksListMenu } from '../helpers/createBooksListMenu'

export const booksListMenu = new Menu<BotContext>('books-list-menu')

booksListMenu.dynamic((ctx, range) => createBooksListMenu(ctx, range))
