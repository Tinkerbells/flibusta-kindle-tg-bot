import { BotContext } from '..'
import { env } from '../env/env'
import { bookInfoMenu } from '../menus'

const url = env.FLIBUSTA_URL

export const backToBookInfoMenu = async (ctx: BotContext) => {
  const book = ctx.session.book
  const text = ctx.t('book_info', {
    title: book.title,
    author: book.author,
    genres: book.genres,
    rate: book.rate,
    size: book.size,
    annotation: book.annotation,
  })
  if (book.image.length > 1) {
    ctx.replyWithPhoto(url + book.image, {
      caption: text,
      parse_mode: 'HTML',
      reply_markup: bookInfoMenu,
    })
  } else {
    ctx.reply(text, { parse_mode: 'HTML', reply_markup: bookInfoMenu })
  }
  await ctx.answerCallbackQuery()
  await ctx.deleteMessage()
}
