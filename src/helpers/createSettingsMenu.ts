import { MenuRange } from '@grammyjs/menu'
import { BotContext } from '..'
import { client } from '../db/client'

export const createSettingsMenu = async (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  if (ctx.from) {
    const userId = ctx.from.id.toString()
    const user = await client.user.findUnique({
      where: { userId: userId },
    })
    range
      .text(
        (ctx) => (user?.email ? ctx.t('email_change') : ctx.t('email_add')),
        (ctx) => ctx.scenes.enter('change-email')
      )
      .row()
      .text(
        (ctx) =>
          ctx.t('show_book_image', {
            value: user?.showBookImage ? '✅' : '❌',
          }),
        async (ctx) => {
          await client.user.update({
            where: { userId: ctx.from.id.toString() },
            data: {
              showBookImage: !user?.showBookImage,
            },
          })
          ctx.menu.update()
        }
      )
      .row()
      .text(
        (ctx) =>
          ctx.t('show_author_image', {
            value: user?.showAuthorImage ? '✅' : '❌',
          }),
        async (ctx) => {
          await client.user.update({
            where: { userId: ctx.from.id.toString() },
            data: {
              showAuthorImage: !user?.showAuthorImage,
            },
          })
          ctx.menu.update()
        }
      )
  }
  return range
}
