import puppeteer, { Browser } from 'puppeteer'
import { env } from '../env/env'
import { IBook } from '../types/book'
import { formatAnnotaion } from '../utils/formatAnnotaion'
import { formatBookRate } from '../utils/formatBookRate'
import { getDownloadFormats } from '../utils/getDownloadFormats'

const url = env.FLIBUSTA_URL

export const getBook = async (bookLink: string) => {
  const bookUrl = `${url}/${bookLink}`
  const browser: Browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/usr/bin/chromium',
  })
  const page = await browser.newPage()
  await page.goto(bookUrl)

  const book: IBook = await page.evaluate(() => ({
    url: document.URL,
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
        e.innerHTML.includes('скачать')
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
