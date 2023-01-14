import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createAuthorBooksMenu } from '../helpers/createAuthorBooksMenu'

export const authorBooksMenu = new Menu<BotContext>('author-books-menu')

authorBooksMenu.dynamic((ctx, range) => createAuthorBooksMenu(ctx, range))
