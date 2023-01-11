import { ScenesComposer } from 'grammy-scenes'
import { BotContext } from '../index'
import { getBookScene } from './getBook.scene'
import { sendBookScene } from './sendBook.scene'

export const scenes = new ScenesComposer<BotContext>(
  getBookScene,
  sendBookScene
)
