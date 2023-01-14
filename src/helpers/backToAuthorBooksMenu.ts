import { BotContext } from '..'
import { env } from '../env/env'
import { authorBooksMenu } from '../menus'

const url = env.FLIBUSTA_URL

export const backToAuthorBooksMenu = async (ctx: BotContext) => {
  const author = ctx.session.author
  if (author.image.length > 1) {
    ctx.replyWithPhoto(url + author.image, {
      caption: author.title,
      parse_mode: 'HTML',
      reply_markup: authorBooksMenu,
    })
  } else {
    ctx.reply(author.title, {
      parse_mode: 'HTML',
      reply_markup: authorBooksMenu,
    })
  }
  await ctx.answerCallbackQuery()
  await ctx.deleteMessage()
}
