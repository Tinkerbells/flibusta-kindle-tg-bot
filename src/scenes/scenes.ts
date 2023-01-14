import { ScenesComposer } from 'grammy-scenes'
import { BotContext } from '../index'
import { changeEmailScene } from './changeEmail.scene'
import { getAuthorScene } from './getAuthor.scene'
import { getBookScene } from './getBook.scene'
import { sendBookScene } from './sendBook.scene'

export const scenes = new ScenesComposer<BotContext>(
  getBookScene,
  getAuthorScene,
  sendBookScene,
  changeEmailScene
)
