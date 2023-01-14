import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createAuthorsListMenu } from '../helpers/createAuthorsMenu'

export const authorListMenu = new Menu<BotContext>('authors-list-menu')

authorListMenu.dynamic((ctx, range) => createAuthorsListMenu(ctx, range))
