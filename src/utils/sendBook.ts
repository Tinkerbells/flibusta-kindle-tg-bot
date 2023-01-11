import { env } from '../env/env'
import transporter from './transporter'

export const sendBook = (fileName: string, path: string, email: string) => {
  const mailOptions = {
    from: env.EMAIL_ADDRESS,
    to: email,
    html: '<div dir="auto"></div>',
    attachments: [
      {
        filename: fileName,
        path: path,
      },
    ],
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
