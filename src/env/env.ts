import * as dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

const schema = z.object({
  BOT_TOKEN: z.string(),
  FLIBUSTA_URL: z.string().url(),
  DOWNLOAD_DIR: z.string(),
  EMAIL_ADDRESS: z.string().email(),
  EMAIL_PASSWORD: z.string(),
  // DATABASE_URL: z.string().url(),
  POCKETBASE_URL: z.string().url(),
})

const parsed = schema.safeParse(process.env)
if (!parsed.success) {
  console.error('❌ Invalid environment variables:')
  process.exit(1)
}

export const env = parsed.data
