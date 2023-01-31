import { MenuRange } from '@grammyjs/menu'
import { env } from 'process'
import { BotContext } from '..'
import { LIMIT } from '../consts'
import { pb } from '../db/client'
import { bookInfoMenu } from '../menus'
import { getBook } from '../scrapper'
import { IBookListItem } from '../types/book'
import { createPagination } from './createPagination'

const url = env.FLIBUSTA_URL

const limit = LIMIT

export const createBooksListMenu = async (
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

const createBooksList = (
  range: MenuRange<BotContext>,
  books: IBookListItem[],
  page: number
) => {
  books.slice(page * limit - limit, page * limit).map((book) =>
    range
      .text('📙' + book.title, async (ctx) => {
        const fetchedBook = await getBook(book.url)
        ctx.session.book = fetchedBook
        ctx.session.back = 'books'
        const text = ctx.t('book_info', {
          title: fetchedBook.title,
          author: fetchedBook.author,
          genres: fetchedBook.genres,
          rate: fetchedBook.rate,
          size: fetchedBook.size,
          annotation: fetchedBook.annotation,
        })
        const user = await pb
          .collection('users')
          .getFirstListItem(`userId=${ctx.from.id}`)

        if (user?.showBookImage && fetchedBook.image.length > 1) {
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
