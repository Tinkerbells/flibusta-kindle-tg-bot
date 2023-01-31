import { Scene } from 'grammy-scenes'
import { pb } from '../db/client'
import { BotContext } from '../index'
import { emailSchema } from '../schemas/emailSchema'

export const changeEmailScene = new Scene<BotContext>('change-email')

changeEmailScene.do(async (ctx) => {
  await ctx.reply(ctx.t('email_request'))
})

changeEmailScene.wait().on('message:text', async (ctx) => {
  const userId = ctx.from.id.toString()
  const email = ctx.message.text
  if (emailSchema.safeParse(email).success && email.includes('@kindle.com')) {
    const user = await pb
      .collection('users')
      .getFirstListItem(`userId=${userId}`)
    await pb
      .collection('users')
      .update(user.id, {
        email: email,
      })
      .then(() => {
        if (user?.email) {
          ctx.reply(ctx.t('email_changed'))
        }
        ctx.reply(ctx.t('email_saved'))
      })
  } else {
    await ctx.reply(ctx.t('email_error'))
  }
  ctx.scene.exit()
})
