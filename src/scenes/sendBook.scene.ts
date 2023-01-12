import { Scene } from 'grammy-scenes'
import { client } from '../db/client'
import { BotContext } from '../index'
import { sendBookMenu } from '../menus/sendBookMenu'
import { emailSchema } from '../schemas/emailSchema'
import { deleteBook } from '../utils/deleteBook'
import { getExtension } from '../utils/getExtension'
import { sendBook } from '../utils/sendBook'

export const sendBookScene = new Scene<BotContext>('send-book')

sendBookScene.do(async (ctx) => {
  const user = await client.user.findUnique({
    where: { userId: ctx.session.userId },
  })
  if (!user?.email) {
    await ctx.reply(ctx.t('email_request'), {
      reply_markup: sendBookMenu,
    })
  } else {
    sendBook(
      `${ctx.session.book.title}.${getExtension(ctx.session.book.fileName)}`,
      ctx.session.book.filePath,
      user.email
    ).then(() => {
      deleteBook(ctx.session.book.filePath)
      ctx.reply(ctx.t('email_sended'), { reply_markup: sendBookMenu })
    })
    ctx.scene.exit()
  }
})

sendBookScene.wait().on('message:text', async (ctx) => {
  if (ctx.session.book.filePath.length > 1) {
    const email = ctx.message.text
    if (emailSchema.safeParse(email).success) {
      sendBook(
        `${ctx.session.book.title}.${getExtension(ctx.session.book.fileName)}`,
        ctx.session.book.filePath,
        email
      ).then(() => {
        deleteBook(ctx.session.book.filePath)
        ctx.session.book.filePath = ''
        ctx.reply(ctx.t('email_sended'))
        ctx.scene.exit()
      })
    } else {
      await ctx.reply(ctx.t('email_error'))
    }
  }
})
