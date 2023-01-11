import { MenuRange } from '@grammyjs/menu'
import { InputFile } from 'grammy'
import { BotContext } from '..'
import { IBook } from '../types/book'
import { downloadBook } from '../utils/downloadBook'
import { backToMain } from './backToMainMenu'

export const createBookInfoMenu = (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  createDownloads(ctx.session.book, range).row()
  if (
    ctx.session.book.downloadLinks.filter(
      (link) => link === 'download' || 'epub'
    ).length > 1
  ) {
    ctx.session.bookFileExtension = ctx.session.book.downloadLinks.includes(
      'epub'
    )
      ? 'epub'
      : 'pdf'
    range
      .text(ctx.t('book_sent_to_kindle'), (ctx, next) => {
        downloadBook(
          `${ctx.session.book.href}/${ctx.session.bookFileExtension}`,
          ctx
        ).then((res) => {
          ctx.deleteMessage()
          ctx.scenes.enter('send-book')
        })
      })
      .row()
  }
  range.text(ctx.t('back'), async (ctx) => {
    await backToMain(ctx)
  })
  return range
}

const createDownloads = (book: IBook, range: MenuRange<BotContext>) => {
  book.downloadLinks.map((link) => {
    range.text(link === 'download' ? '📥 pdf' : '📥 ' + link, (ctx) => {
      ctx.replyWithDocument(
        new InputFile(
          new URL(`${book.href}/${link}`),
          `${book.title}.${link === 'download' ? 'pdf' : link}`
        )
      )
    })
  })
  return range
}
