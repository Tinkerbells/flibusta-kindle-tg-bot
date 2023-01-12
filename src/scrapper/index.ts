import puppeteer, { Browser } from 'puppeteer'
import { env } from '../env/env'
import { IBook, IBookListItem } from '../types/book'
import { formatAnnotaion } from '../utils/formatAnnotaion'
import { formatBookRate } from '../utils/formatBookRate'
import { getDownloadFormats } from '../utils/getDownloadFormats'

const url = env.FLIBUSTA_URL

export const getBooks = async (bookName: string) => {
  const browser: Browser = await puppeteer.launch()
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
        href: book.getElementsByTagName('a')[0]?.getAttribute('href') || '',
        title: book?.getElementsByTagName('a')[0]?.innerText || '',
      }))
      return book
    })
    booksData = booksData.concat(data)
  }

  await browser.close()
  return booksData
}

export const getBook = async (bookLink: string) => {
  const bookUrl = `${url}/${bookLink}`
  const browser: Browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(bookUrl)

  const book: IBook = await page.evaluate(() => ({
    href: document.URL,
    title: document.querySelector('.title')?.textContent || '',
    author: document.querySelector('h1 ~ a')?.textContent || '',
    authorLink: document.querySelector('h1 ~ a')?.getAttribute('href') || '',
    image:
      document.querySelector("[title='Cover image']")?.getAttribute('src') ||
      '',
    annotation: document.querySelector('h2 ~ p')?.textContent || 'Отсутствует',
    size: document.querySelector("div[class^='g-'] > span")?.textContent || '',
    downloadLinks: Array.from(
      document.querySelectorAll("div[class^='g-'] > a"),
      (e) =>
        e.innerHTML.match('скачать')
          ? e.innerHTML.replace(/[()]/g, '').replace('скачать ', '')
          : e.getAttribute('href') || ''
    ),
    genres: Array.from(
      document.querySelectorAll('a.genre'),
      (e) => e.textContent || ''
    ).join(', '),
    rate: document.querySelector('#newann')?.textContent || '',
    filePath: '',
    fileName: '',
  }))

  book.downloadLinks = getDownloadFormats(book.downloadLinks)
  book.rate = formatBookRate(book.rate)
  book.annotation = formatAnnotaion(book.annotation)

  await browser.close()
  return book
}
