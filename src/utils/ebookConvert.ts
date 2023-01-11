import { spawn } from 'child_process'

export const ebookConvert = (path: string, newPath: string) => {
  const command = spawn('ebook-convert', [path, newPath])

  command.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })
  command.on('error', (error) => {
    console.log(`error: ${error.message}`)
  })
}
