import { MenuRange } from '@grammyjs/menu'
import { BotContext } from '..'
import { pb } from '../db/client'
import { backToBookInfoMenu } from './backToBookInfoMenu'

export const createSaveEmailMenu = async (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  const user = await pb
    .collection('users')
    .getFirstListItem(`userId=${ctx.session.userId}`)
  range
    .text(
      async (ctx) => {
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
            .update(user.id, {
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
