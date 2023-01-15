import puppeteer, { Browser } from 'puppeteer'
import { env } from '../env/env'
import { IBookListItem } from '../types/book'

const url = env.FLIBUSTA_URL

export const getBooks = async (bookName: string) => {
  const browser: Browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto(`${url}/booksearch?ask=${bookName}&chb=on`)

  const pagination = await page.evaluate(() => {
    const pager = document.querySelector('.pager')
    const lastPage =
      pager &&
      parseInt(
        Array.from(pager.querySelectorAll('.pager-item')).pop()
          ?.textContent as string
      ) - 1

    return lastPage || 0
  })

  let booksData: IBookListItem[] = []

  for (let i = 0; i <= pagination; i++) {
    await page.goto(`${url}/booksearch?page=${i}&ask=${bookName}&chb=on`)
    const data = await page.evaluate(() => {
      const main = Array.from(
        document.querySelectorAll('#main > ul:not([pager]) > li')
      )
      const book = main.map((book) => ({
        url: book.getElementsByTagName('a')[0]?.getAttribute('href') || '',
        title: book?.getElementsByTagName('a')[0]?.innerText || '',
      }))
      return book
    })
    booksData = booksData.concat(data)
  }

  await browser.close()
  return booksData
}
