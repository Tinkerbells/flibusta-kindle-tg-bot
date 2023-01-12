import { MenuRange } from '@grammyjs/menu'
import { BotContext } from '..'
import { backToBookInfoMenu } from './backToBookInfoMenu'

export const createSendBookMenu = (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  range.text(ctx.t('back'), (ctx) => {
    ctx.scenes.abort()
    backToBookInfoMenu(ctx)
  })
  return range
}
