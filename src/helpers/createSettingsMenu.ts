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
    range.text(
      (ctx) => (user ? ctx.t('email_change') : ctx.t('email_add')),
      (ctx) => ctx.scenes.enter('change-email')
    )
  }
  return range
}
