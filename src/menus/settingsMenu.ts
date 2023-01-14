import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import { createSettingsMenu } from '../helpers/createSettingsMenu'

export const settingsMenu = new Menu<BotContext>('settings-menu')

settingsMenu.dynamic((ctx, range) => createSettingsMenu(ctx, range))
