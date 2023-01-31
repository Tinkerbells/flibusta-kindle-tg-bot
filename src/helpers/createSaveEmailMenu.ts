import { MenuRange } from '@grammyjs/menu'
import { BotContext } from '..'
import { pb } from '../db/client'
import { backToBookInfoMenu } from './backToBookInfoMenu'

export const createSaveEmailMenu = (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  range
    .text(
      async (ctx) => {
        const user = await pb
          .collection('users')
          .getFirstListItem(`userId=${ctx.session.userId}`)
        return user?.email ? ctx.t('email_saved_short') : ctx.t('yes')
      },
      async (ctx) => {
        const kindleEmail = ctx.session.kindleEmail
        if (
          kindleEmail.length > 1 &&
          ctx.session.userId &&
          ctx.session.kindleEmail
        )
          await pb
            .collection('users')
            .create({
              userId: ctx.from.id,
              email: kindleEmail,
            })
            .then(() => {
              ctx.session.kindleEmail = ''
              ctx.menu.update()
              ctx.scenes.abort()
            })
      }
    )
    .text(ctx.t('back'), (ctx) => {
      ctx.scenes.abort()
      backToBookInfoMenu(ctx)
    })
  return range
}
