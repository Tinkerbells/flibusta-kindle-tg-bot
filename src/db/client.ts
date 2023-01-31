import { env } from '../env/env'
const PocketBase = require('pocketbase/cjs')

export const pb = new PocketBase(env.POCKETBASE_URL)
