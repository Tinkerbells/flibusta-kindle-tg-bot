import { Scene } from 'grammy-scenes'
import { client } from '../db/client'
import { BotContext } from '../index'
import { emailSchema } from '../schemas/emailSchema'

export const changeEmailScene = new Scene<BotContext>('change-email')

changeEmailScene.do(async (ctx) => {
  await ctx.reply(ctx.t('email_request'))
})

changeEmailScene.wait().on('message:text', async (ctx) => {
  const userId = ctx.from.id.toString()
  const email = ctx.message.text
  const user = await client.user.findUnique({
    where: { userId: userId },
  })
  if (emailSchema.safeParse(email).success && email.includes('@kindle.com')) {
    if (user) {
      await client.user
       .update({
          where: {
            userId: userId,
          },
          data: {
            email: email,
          },
        })
        .then(() => {
          ctx.reply(ctx.t('email_changed'))
          ctx.scene.exit()
        })
    } else {
      await client.user
        .create({
          data: {
            userId: userId,
            email: email,
          },
        })
        .then(() => {
          ctx.reply(ctx.t('email_saved'))
          ctx.scene.exit()
        })
    }
  } else {
    await ctx.reply(ctx.t('email_error'))
  }
})
