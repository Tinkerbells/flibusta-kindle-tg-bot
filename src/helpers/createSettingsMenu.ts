import { MenuRange } from '@grammyjs/menu'
import { BotContext } from '..'
import { pb } from '../db/client'

export const createSettingsMenu = async (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  if (ctx.from) {
    const user = await pb
      .collection('users')
      .getFirstListItem(`userId=${ctx.from.id}`)
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
          await pb.collection('users').update(user.id, {
            showBookImage: !user?.showBookImage,
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
          await pb.collection('users').update(user.id, {
            showAuthorImage: !user?.showAuthorImage,
          })
          ctx.menu.update()
        }
      )
  }
  return range
}
