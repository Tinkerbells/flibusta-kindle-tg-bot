import nodemailer from 'nodemailer'
import { env } from '../env/env'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_ADDRESS,
    pass: env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export default transporter
