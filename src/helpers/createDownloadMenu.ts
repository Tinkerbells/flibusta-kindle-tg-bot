import { MenuRange } from '@grammyjs/menu'
import { InputFile } from 'grammy'
import { URL } from 'url'
import { BotContext } from '..'

export const createDownloadMenu = (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  const book = ctx.session.book
  book.downloadLinks.map((link) => {
    range
      .text('📥 ' + link, (ctx) => {
        ctx.replyWithDocument(
          new InputFile(new URL(`${book.url}/${link}`), `${book.title}.${link}`)
        )
      })
      .row()
  })
  range.text(ctx.t('back'), (ctx) => ctx.menu.nav('book-info-menu')).row()
  return range
}
