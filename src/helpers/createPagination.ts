import { MenuRange } from '@grammyjs/menu'
import { BotContext } from '..'

export const createPagination = (
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
      .text(`${page}/${maxPages}`, (ctx) => {
        const middlePage = Math.floor(maxPages / 2)
        if (page > middlePage) {
          ctx.session.page = 1
        } else {
          ctx.session.page = maxPages
        }
        ctx.menu.update()
      })
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
