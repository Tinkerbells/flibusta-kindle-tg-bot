import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createSendBookMenu } from '../helpers/createSendBookMenu'

export const sendBookMenu = new Menu<BotContext>('send-book-menu')

sendBookMenu.dynamic((ctx, range) => createSendBookMenu(ctx, range))
