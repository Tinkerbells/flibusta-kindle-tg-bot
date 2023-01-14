import puppeteer, { Browser } from 'puppeteer'
import { env } from '../env/env'
import { IAuthorListItem } from '../types/author'

const url = env.FLIBUSTA_URL

export const getAuthors = async (authorName: string) => {
  const browser: Browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`${url}/booksearch?ask=${authorName}&cha=on`)

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

  let authorList: IAuthorListItem[] = []

  for (let i = 0; i <= pagination; i++) {
    await page.goto(`${url}/booksearch?page=${i}&ask=${authorName}&cha=on`)
    const authorItem = await page.evaluate(() => {
      const main = Array.from(
        document.querySelectorAll('#main > ul:not([pager]) > li')
      )
      const item = main.map((book) => ({
        url: book.getElementsByTagName('a')[0]?.getAttribute('href') || '',
        title: book?.getElementsByTagName('a')[0]?.innerText || '',
      }))
      return item
    })
    authorList = authorList.concat(authorItem)
  }

  await browser.close()
  return authorList
}
