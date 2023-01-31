import { BotContext } from '..'
import { pb } from '../db/client'
import { env } from '../env/env'
import { authorBooksMenu } from '../menus'

const url = env.FLIBUSTA_URL

export const backToAuthorBooksMenu = async (ctx: BotContext) => {
  const author = ctx.session.author
  const user = ctx.from
    ? await pb.collection('users').getFirstListItem(`userId=${ctx.from.id}`)
    : null
  if (user?.showAuthorImage && author.image.length > 1) {
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
