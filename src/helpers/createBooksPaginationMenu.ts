import { Menu, MenuRange } from '@grammyjs/menu'
import { env } from 'process'
import { BotContext } from '..'
import { LIMIT } from '../consts'
import { bookInfoMenu } from '../menus/bookInfoMenu'
import { getBook } from '../scrapper'
import { IBookListItem } from '../types/book'

const url = env.FLIBUSTA_URL

const limit = LIMIT

export const createBooksPaginationMenu = async (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  const books = ctx.session.books
  const page = ctx.session.page
  const maxPages = Math.ceil(books.length / limit)
  createBooksList(range, books, ctx.session.page)
  createPagination(range, maxPages, page)
  return range
}

const createPagination = (
  range: MenuRange<BotContext>,
  maxPages: number,
  page: number
) => {
  if (page == 1 && maxPages !== 1) {
    range.text('➡️', async (ctx) => {
      ctx.session.page++
      ctx.menu.update()
    })
  }
  if (page > 1 && page != maxPages) {
    range
      .text('⬅️', async (ctx) => {
        ctx.session.page--
        ctx.menu.update()
      })
      .text(`${page}/${maxPages}`, () => {})
      .text('➡️', async (ctx) => {
        ctx.session.page++
        ctx.menu.update()
      })
  }
  if (page == maxPages && maxPages !== 1) {
    range.text('⬅️', async (ctx) => {
      ctx.session.page--
      ctx.menu.update()
    })
  }
  return range
}
const createBooksList = (
  range: MenuRange<BotContext>,
  books: IBookListItem[],
  page: number
) => {
  books.slice(page * limit - limit, page * limit).map((book) =>
    range
      .text('📙' + book.title, async (ctx) => {
        const fetchedBook = await getBook(book.href)
        ctx.session.book = fetchedBook
        const text = ctx.t('book_info', {
          title: fetchedBook.title,
          author: fetchedBook.author,
          genres: fetchedBook.genres,
          rate: fetchedBook.rate,
          size: fetchedBook.size,
          annotation: fetchedBook.annotation,
        })
        if (fetchedBook.image.length > 1) {
          ctx.replyWithPhoto(url + fetchedBook.image, {
            caption: text,
            parse_mode: 'HTML',
            reply_markup: bookInfoMenu,
          })
        } else {
          ctx.reply(text, { parse_mode: 'HTML', reply_markup: bookInfoMenu })
        }
        await ctx.answerCallbackQuery()
        await ctx.deleteMessage()
      })
      .row()
  )
  return range
}
