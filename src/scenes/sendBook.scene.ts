import { InlineKeyboard } from 'grammy'
import { Scene } from 'grammy-scenes'
import { client } from '../db/client'
import { BotContext } from '../index'
import { backToBookInfoMenu, saveEmailMenu } from '../menus'
import { emailSchema } from '../schemas/emailSchema'
import { deleteBook } from '../utils/deleteBook'
import { getExtension } from '../utils/getExtension'
import { sendBook } from '../utils/sendBook'

export const sendBookScene = new Scene<BotContext>('send-book')
sendBookScene.label('start')

sendBookScene.do(async (ctx) => {
  const user = await client.user.findUnique({
    where: { userId: ctx.session.userId || ' ' },
  })
  if (!user?.email) {
    await ctx.reply(ctx.t('email_request'), {
      reply_markup: backToBookInfoMenu,
    })
  } else {
    sendBook(
      `${ctx.session.book.title}.${getExtension(ctx.session.book.fileName)}`,
      ctx.session.book.filePath,
      user.email
    ).then(() => {
      deleteBook(ctx.session.book.filePath)
      ctx.reply(ctx.t('email_sended'))
    })
    ctx.scene.exit()
  }
})

sendBookScene.wait().on('message:text', async (ctx) => {
  if (ctx.session.book.filePath.length > 1) {
    const email = ctx.message.text
    const replyKeyboard = new InlineKeyboard()
      .text(ctx.t('yes'), 'send')
      .text(ctx.t('retry'), 'start')
    if (emailSchema.safeParse(email).success && email.includes('@kindle.com')) {
      ctx.session.kindleEmail = email
      ctx.reply(ctx.t('email_check', { email: email }), {
        reply_markup: replyKeyboard,
      })
      ctx.scene.resume()
    } else {
      await ctx.reply(ctx.t('email_error'))
    }
  }
})

sendBookScene.wait().on('callback_query:data', async (ctx) => {
  const cb = ctx.callbackQuery.data
  if (cb === 'start') {
    ctx.scene.goto('start')
  } else if (cb === 'send') {
    sendBook(
      `${ctx.session.book.title}.${getExtension(ctx.session.book.fileName)}`,
      ctx.session.book.filePath,
      ctx.session.kindleEmail
    ).then(() => {
      deleteBook(ctx.session.book.filePath)
      ctx.reply(ctx.t('email_sended'))
    })
    ctx.scene.resume()
  }
})

sendBookScene.do(async (ctx) => {
  ctx.reply('Сохранить Kindle почту для следующих отправок?', {
    reply_markup: saveEmailMenu,
  })
})
