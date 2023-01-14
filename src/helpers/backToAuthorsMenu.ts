import { BotContext } from '..'
import { authorListMenu } from '../menus'

export const backToAuthorsMenu = async (ctx: BotContext) => {
  await ctx.reply(
    `<b>${ctx.t('author_search_success', {
      count: ctx.session.authors.length,
    })}</b>`,
    {
      parse_mode: 'HTML',
      reply_markup: authorListMenu,
    }
  )
  await ctx.deleteMessage()
  await ctx.answerCallbackQuery()
}
