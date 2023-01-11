import { Bot, Context, session, SessionFlavor } from 'grammy'
import { ScenesSessionFlavor, ScenesFlavor } from 'grammy-scenes'
import { I18n, I18nFlavor } from '@grammyjs/i18n'
import { FileFlavor, hydrateFiles } from '@grammyjs/files'
import { env } from './env/env'
import { IBook, IBookListItem } from './types/book'
import { scenes } from './scenes/scenes'
import { booksMenu } from './menus/booksPaginationMenu'

type SessionData = ScenesSessionFlavor & {
  page: number
  book: IBook
  books: IBookListItem[]
  bookFilePath: string
  bookFileName: string
  bookFileExtension: string
}

type CustomContext = Context &
  SessionFlavor<SessionData> &
  ScenesFlavor &
  I18nFlavor

export type BotContext = FileFlavor<CustomContext>

const i18n = new I18n<BotContext>({
  defaultLocale: 'ru',
  useSession: true,
  directory: 'locales',
  globalTranslationContext(ctx) {
    return {
      first_name: ctx.from?.first_name ?? '',
    }
  },
})

const bot = new Bot<BotContext>(env.BOT_TOKEN)

bot.api.config.use(hydrateFiles(env.BOT_TOKEN))

bot.use(
  session({
    initial: () => ({}),
  })
)
bot.use(i18n)
bot.use(scenes.manager())
bot.command('get', async (ctx) => {
  await ctx.reply(ctx.t('welcome'))
  await ctx.scenes.enter('get-book-scene')
})

bot.use(booksMenu)
bot.use(scenes)
bot.start()
