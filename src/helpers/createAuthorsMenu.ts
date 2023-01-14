import { MenuRange } from '@grammyjs/menu'
import { env } from 'process'
import { BotContext } from '..'
import { LIMIT } from '../consts'
import { authorBooksMenu } from '../menus/authorBooksMenu'
import { getAuthor } from '../scrapper/getAuthor'
import { IAuthorListItem } from '../types/author'
import { createPagination } from './createPagination'

const url = env.FLIBUSTA_URL

const limit = LIMIT

export const createAuthorsListMenu = async (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  const authors = ctx.session.authors
  const page = ctx.session.page
  const maxPages = Math.ceil(authors.length / limit)
  createAuthorsList(range, authors, ctx.session.page)
  createPagination(range, maxPages, page)
  return range
}
const createAuthorsList = (
  range: MenuRange<BotContext>,
  authors: IAuthorListItem[],
  page: number
) => {
  authors.slice(page * limit - limit, page * limit).map((author) =>
    range
      .text('📙' + author.title, async (ctx) => {
        const fetchedAuthor = await getAuthor(author.url)
        ctx.session.author = fetchedAuthor
        ctx.session.page = 1
        if (fetchedAuthor.image.length > 1) {
          ctx.replyWithPhoto(url + fetchedAuthor.image, {
            caption: fetchedAuthor.title,
            parse_mode: 'HTML',
            reply_markup: authorBooksMenu,
          })
        } else {
          ctx.reply(fetchedAuthor.title, {
            parse_mode: 'HTML',
            reply_markup: authorBooksMenu,
          })
        }
        await ctx.answerCallbackQuery()
        await ctx.deleteMessage()
      })
      .row()
  )
  return range
}
