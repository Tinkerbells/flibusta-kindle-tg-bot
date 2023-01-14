import { Menu } from '@grammyjs/menu'
import { BotContext } from '..'
import {
  booksListMenu,
  saveEmailMenu,
  bookInfoMenu,
  backToBookInfoMenu,
  downloadMenu,
  settingsMenu,
  authorListMenu,
  authorBooksMenu,
} from '../menus'

export const rootMenu = new Menu<BotContext>('root-menu')

rootMenu.register(bookInfoMenu)
rootMenu.register(booksListMenu)
rootMenu.register(authorListMenu)
rootMenu.register(authorBooksMenu)
rootMenu.register(backToBookInfoMenu)
rootMenu.register(saveEmailMenu)
rootMenu.register(downloadMenu)
rootMenu.register(settingsMenu)
