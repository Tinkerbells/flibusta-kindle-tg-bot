import { Bot, Context, session, SessionFlavor } from 'grammy'
import { ScenesSessionFlavor, ScenesFlavor } from 'grammy-scenes'
import { I18n, I18nFlavor } from '@grammyjs/i18n'
import { IBook, IBookListItem } from './types/book'
import { scenes } from './scenes/scenes'
import { booksMenu } from './menus/booksPaginationMenu'
import { env } from './env/env'
import { client } from './db/client'

export type SessionData = ScenesSessionFlavor & {
  userId: string
  page: number
  book: IBook
  books: IBookListItem[]
}

export type BotContext = Context &
  SessionFlavor<SessionData> &
  ScenesFlavor &
  I18nFlavor

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
bot.use(
  session({
    initial: () => ({}),
  })
)
bot.use(i18n)
bot.use(scenes.manager())
bot.use(booksMenu)
bot.use(scenes)

bot.command('start', async (ctx) => {
  ctx.session.userId = ctx.from?.id.toString() || ''
  await ctx.reply(ctx.t('welcome'))
})

bot.command('help', async (ctx) => {
  ctx.session.userId = ctx.from?.id.toString() || ''
  await ctx.reply(ctx.t('help'))
})

bot.command('get', async (ctx) => {
  ctx.session.userId = ctx.from?.id.toString() || ''
  console.log(ctx.session.userId)
  await ctx.scenes.enter('get-book-scene')
})

bot.start()
