import { BotContext } from '..'
import { booksMenu } from '../menus/booksPaginationMenu'

export const backToMain = async (ctx: BotContext) => {
  await ctx.reply(
    `<b>${ctx.t('book_fetching_success', {
      count: ctx.session.books.length,
    })}</b>`,
    {
      parse_mode: 'HTML',
      reply_markup: booksMenu,
    }
  )
  await ctx.deleteMessage()
}
