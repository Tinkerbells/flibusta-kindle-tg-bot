import fs from 'fs'
export const deleteBook = (bookFilePath: string) => {
  fs.unlink(bookFilePath, (err) => {
    if (err) {
      throw err
    }
    console.log('File is deleted.')
  })
}
