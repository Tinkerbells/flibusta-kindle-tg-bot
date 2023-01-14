import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createSaveEmailMenu } from '../helpers/createSaveEmailMenu'

export const saveEmailMenu = new Menu<BotContext>('save-email-menu')

saveEmailMenu.dynamic((ctx, range) => createSaveEmailMenu(ctx, range))
