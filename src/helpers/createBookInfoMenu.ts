import { MenuRange } from '@grammyjs/menu'
import { InputFile } from 'grammy'
import { BotContext } from '..'
import { downloadBook } from '../utils/downloadBook'
import { backToBooksMenu } from './backToBooksMenu'

export const createBookInfoMenu = (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  let ext = 'epub'
  const links = ctx.session.book.downloadLinks

  if (links.length === 1) {
    ext = links.join('')
    range
      .text('📥 ' + ext, (ctx) => {
        ctx.replyWithDocument(
          new InputFile(
            new URL(`${ctx.session.book.href}/download`),
            `${ctx.session.book.title}.${ext}`
          )
        )
      })
      .row()
  } else {
    range.submenu(ctx.t('download'), 'download-menu').row()
  }

  if (links.filter((link) => link === 'pdf' || 'epub').length > 0) {
    range
      .text(ctx.t('book_sent_to_kindle'), (ctx) => {
        downloadBook(
          `${ctx.session.book.href}/${ext !== 'epub' ? 'download' : ext}`,
          ctx
        ).then(() => {
          ctx.deleteMessage()
          ctx.scenes.enter('send-book')
        })
      })
      .row()
  }
  range
    .text(ctx.t('back'), async (ctx) => {
      await backToBooksMenu(ctx)
    })
    .row()
  return range
}
