import { MenuRange } from '@grammyjs/menu'
import { BotContext } from '..'
import { backToBookInfoMenu } from './backToBookInfoMenu'

export const createBackToBookInfo = (
  ctx: BotContext,
  range: MenuRange<BotContext>
) => {
  range.text(ctx.t('back'), (ctx) => {
    ctx.scenes.abort()
    backToBookInfoMenu(ctx)
  })
  return range
}
