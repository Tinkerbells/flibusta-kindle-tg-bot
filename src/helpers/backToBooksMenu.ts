import { BotContext } from '..'
import { booksListMenu } from '../menus'

export const backToBooksMenu = async (ctx: BotContext) => {
  await ctx.reply(
    `<b>${ctx.t('book_search_success', {
      count: ctx.session.books.length,
    })}</b>`,
    {
      parse_mode: 'HTML',
      reply_markup: booksListMenu,
    }
  )
  await ctx.deleteMessage()
  await ctx.answerCallbackQuery()
}
