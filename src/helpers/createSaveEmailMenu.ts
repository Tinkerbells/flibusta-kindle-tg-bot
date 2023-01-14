import { MenuRange } from '@grammyjs/menu'
import { BotContext } from '..'
import { client } from '../db/client'
import { backToBookInfoMenu } from './backToBookInfoMenu'

export const createSaveEmailMenu = (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  range
    .text(
      async (ctx) => {
        const user = await client.user.findUnique({
          where: { userId: ctx.session.userId || ' ' },
        })
        return user?.email ? ctx.t('email_saved_short') : ctx.t('yes')
      },
      async (ctx) => {
        const kindleEmail = ctx.session.kindleEmail
        if (
          kindleEmail.length > 1 &&
          ctx.session.userId &&
          ctx.session.kindleEmail
        )
          await client.user
            .create({
              data: {
                userId: ctx.session.userId,
                email: ctx.session.kindleEmail,
              },
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
