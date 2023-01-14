import { Scene } from 'grammy-scenes'
import { BotContext } from '../index'
import { authorListMenu } from '../menus'
import { getAuthors } from '../scrapper/getAuthors'

export const getAuthorScene = new Scene<BotContext>('get-author')

getAuthorScene.label('start')

getAuthorScene.do(async (ctx) => {
  await ctx.reply(ctx.t('author_search'))
})

getAuthorScene.wait().on('message:text', async (ctx) => {
  ctx.session.authors = await getAuthors(ctx.message.text)
  if (ctx.session.authors.length >= 1) {
    ctx.session.page = 1
    await ctx.reply(
      ctx.t('author_search_success', {
        count: ctx.session.authors.length,
      }),
      {
        parse_mode: 'HTML',
        reply_markup: authorListMenu,
      }
    )
    ctx.scene.resume()
  } else {
    await ctx.reply(ctx.t('author_search_fail'), {
      parse_mode: 'HTML',
    })
    ctx.scene.exit()
  }
})
