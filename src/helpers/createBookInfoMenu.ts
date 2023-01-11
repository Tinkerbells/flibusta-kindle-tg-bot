import { MenuRange } from '@grammyjs/menu'
import { BotContext } from '..'
import { downloadBook } from '../utils/downloadBook'
import { getExtension } from '../utils/getExtension'
import { backToMain } from './backToMainMenu'

export const createBookInfoMenu = (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  range.submenu(ctx.t('download'), 'download-menu').row()
  if (
    ctx.session.book &&
    ctx.session.book.downloadLinks.filter(
      (link) => link === 'download' || 'epub'
    ).length > 1
  ) {
    range
      .text(ctx.t('book_sent_to_kindle'), (ctx) => {
        const ext = ctx.session.book.downloadLinks.includes('epub')
          ? 'epub'
          : 'pdf'
        downloadBook(`${ctx.session?.book?.href}/${ext}`, ctx).then((res) => {
          ctx.deleteMessage()
          ctx.scenes.enter('send-book')
        })
      })
      .row()
  }
  range
    .text(ctx.t('back'), async (ctx) => {
      await backToMain(ctx)
    })
    .row()
  return range
}
