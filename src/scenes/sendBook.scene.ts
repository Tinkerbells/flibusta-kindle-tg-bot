import { Scene } from 'grammy-scenes'
import { client } from '../db/client'
import { BotContext } from '../index'
import { booksMenu } from '../menus/booksPaginationMenu'
import { emailSchema } from '../schemas/emailSchema'
import { deleteBook } from '../utils/deleteBook'
import { getExtension } from '../utils/getExtension'
import { sendBook } from '../utils/sendBook'

export const sendBookScene = new Scene<BotContext>('send-book')

sendBookScene.do(async (ctx, next) => {
  const user = await client.user.findUnique({
    where: { userId: ctx.session.userId },
  })
  if (!user?.email) {
    await ctx.reply(ctx.t('email_request'), {
      reply_markup: {
        inline_keyboard: [[{ text: ctx.t('back'), callback_data: 'back' }]],
      },
    })
  } else {
    sendBook(
      `${ctx.session.book.title}.${getExtension(ctx.session.book.fileName)}`,
      ctx.session.book.filePath,
      user.email
    ).then(() => {
      deleteBook(ctx.session.book.filePath)
      ctx.session.book.filePath = ''
      ctx.reply(ctx.t('email_sended'))
    })
    ctx.scene.exit()
  }
})

sendBookScene.wait().setup((scene) => {
  scene.on('callback_query:data', async (ctx) => {
    const cb = ctx.callbackQuery.data
    if (cb === 'back') {
      ctx.deleteMessage()
      deleteBook(ctx.session.book.filePath)
      await ctx.reply(
        ctx.t('book_fetching_success', {
          count: ctx.session.books.length,
        }),
        {
          parse_mode: 'HTML',
          reply_markup: booksMenu,
        }
      )
    }
    ctx.scene.resume()
  })
  scene.on('message:text', async (ctx) => {
    await client.user.create({
      data: { userId: ctx.from.id.toString(), email: ctx.message.text },
    })
    if (ctx.session.book.filePath.length > 1) {
      const email = ctx.message.text
      if (emailSchema.safeParse(email).success) {
        sendBook(
          `${ctx.session.book.title}.${getExtension(
            ctx.session.book.fileName
          )}`,
          ctx.session.book.filePath,
          email
        ).then(() => {
          deleteBook(ctx.session.book.filePath)
          ctx.session.book.filePath = ''
          ctx.reply(ctx.t('email_sended'))
        })
      } else {
        await ctx.reply(ctx.t('email_error'))
      }
    }
  })
})

sendBookScene.do(async (ctx) => {
  ctx.scene.exit()
})
