import {
  Bot,
  Context,
  GrammyError,
  HttpError,
  session,
  SessionFlavor,
} from 'grammy'
import { autoRetry } from '@grammyjs/auto-retry'
import { run } from '@grammyjs/runner'
import { apiThrottler } from '@grammyjs/transformer-throttler'
import { ScenesSessionFlavor, ScenesFlavor } from 'grammy-scenes'
import { I18n, I18nFlavor } from '@grammyjs/i18n'
import { IBook, IBookListItem } from './types/book'
import { scenes } from './scenes/scenes'
import { env } from './env/env'
import { rootMenu, settingsMenu } from './menus'
import { IAuthor, IAuthorListItem } from './types/author'
import { client } from './db/client'

export type SessionData = ScenesSessionFlavor & {
  back: string
  userId: string
  kindleEmail: string
  page: number
  book: IBook
  books: IBookListItem[]
  authors: IAuthorListItem[]
  author: IAuthor
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

const throttler = apiThrottler()
bot.api.config.use(throttler)
bot.api.config.use(
  autoRetry({
    maxRetryAttempts: 3,
    maxDelaySeconds: 3,
  })
)

bot.use(
  session({
    initial: () => ({}),
  })
)

bot.use(i18n)
bot.use(scenes.manager())
bot.use(rootMenu)
bot.use(scenes)

bot.command('start', async (ctx) => {
  await ctx.reply(ctx.t('welcome'))
  if (ctx.from) {
    const user = await client.user.findUnique({
      where: { userId: ctx.from.id.toString() },
    })
    if (!user) {
      await client.user.create({
        data: {
          userId: ctx.from.id.toString(),
        },
      })
      console.log(`New user with ${ctx.from.id} was created`)
    }
  }
})

bot.command('help', async (ctx) => {
  await ctx.scenes.abort()
  await ctx.reply(ctx.t('help'))
})

bot.command('book', async (ctx) => {
  await ctx.scenes.abort()
  ctx.session.userId = ctx.from?.id.toString() || ''
  await ctx.scenes.enter('get-book-scene')
})

bot.command('author', async (ctx) => {
  await ctx.scenes.abort()
  ctx.session.userId = ctx.from?.id.toString() || ''
  await ctx.scenes.enter('get-author')
})

bot.command('settings', async (ctx) => {
  await ctx.scenes.abort()
  await ctx.reply(ctx.t('settings'), { reply_markup: settingsMenu })
})

run(bot)

bot.catch((err) => {
  const ctx = err.ctx
  console.error(`Error while handling update ${ctx.update.update_id}:`)
  const e = err.error
  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description)
  } else if (e instanceof HttpError) {
    console.error('Could not contact Telegram:', e)
  } else {
    console.error('Unknown error:', e)
  }
})
