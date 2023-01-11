import { Scene } from 'grammy-scenes'
import { BotContext } from '../index'
import { booksMenu } from '../menus/booksPaginationMenu'
import { emailSchema } from '../schemas/emailSchema'
import { deleteBook } from '../utils/deleteBook'
import { sendBook } from '../utils/sendBook'

export const sendBookScene = new Scene<BotContext>('send-book')

sendBookScene.label('start')

sendBookScene.do(async (ctx) => {
  await ctx.reply(ctx.t('email_request'), {
    reply_markup: {
      inline_keyboard: [[{ text: ctx.t('back'), callback_data: 'back' }]],
    },
  })
})

sendBookScene.wait().setup((scene) => {
  scene.on('callback_query:data', async (ctx) => {
    const cb = ctx.callbackQuery.data
    if (cb === 'back') {
      deleteBook(ctx.session.bookFilePath)
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
    if (ctx.session.bookFilePath) {
      const email = ctx.message.text
      if (emailSchema.safeParse(email).success) {
        sendBook(
          `${ctx.session.book.title}.${ctx.session.bookFileExtension}`,
          ctx.session.bookFilePath,
          email
        ).then((res) => {
          deleteBook(ctx.session.bookFilePath)
          ctx.session.bookFilePath = ''
          console.log(ctx)
          ctx.reply(ctx.t('email_sended'))
        })
      } else {
        await ctx.reply(ctx.t('email_error'))
      }
    }
  })
})
