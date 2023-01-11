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
      .text(link === 'download' ? '📥 pdf' : '📥 ' + link, (ctx) => {
        ctx.replyWithDocument(
          new InputFile(
            new URL(`${book.href}/${link}`),
            `${book.title}.${link === 'download' ? 'pdf' : link}`
          )
        )
      })
      .row()
  })
  range.back(ctx.t('back')).row()
  return range
}
