import { Scene } from 'grammy-scenes'
import { BotContext } from '../index'
import { booksListMenu } from '../menus'
import { getBooks } from '../scrapper'

export const getBookScene = new Scene<BotContext>('get-book-scene')

getBookScene.label('start')

getBookScene.do(async (ctx) => {
  await ctx.reply(ctx.t('book_search'))
})

getBookScene.wait().on('message:text', async (ctx) => {
  if (ctx.message.text[0] !== '/') {
    ctx.session.books = await getBooks(ctx.message.text)
    if (ctx.session.books.length >= 1) {
      ctx.session.page = 1
      await ctx.reply(
        ctx.t('book_search_success', {
          count: ctx.session.books.length,
        }),
        {
          parse_mode: 'HTML',
          reply_markup: booksListMenu,
        }
      )
    } else {
      await ctx.reply(ctx.t('book_search_fail'), {
        parse_mode: 'HTML',
      })
    }
  } else {
    await ctx.reply(ctx.t('search_error'), {
      parse_mode: 'HTML',
    })
  }
  ctx.scene.exit()
})
