import puppeteer, { Browser } from 'puppeteer'
import { env } from '../env/env'
import { IAuthor, IAuthorBook } from '../types/author'

const url = env.FLIBUSTA_URL

export const getAuthor = async (authorLink: string) => {
  const authorUrl = `${url}/${authorLink}?lang=__&order=a&hg1=1&hg=1&sa1=1&hr1=1`
  const browser: Browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(authorUrl)

  const author: IAuthor = await page.evaluate(() => {
    const ratings = Array.from(
      document.querySelectorAll('rect'),
      (e) => e.textContent?.replace(/[^0-9.]/g, '') || ''
    )
    const books = Array.from(document.querySelectorAll('form > a'), (e, i) => {
      return {
        url: e.getAttribute('href') || '',
        title: e.textContent || '',
      }
    })
      .filter((e) => e.url.match('/b/') && e.url.split('/').length < 4)
      .map((e, i) => ({
        url: e.url,
        title: e.title,
        rate: parseFloat(ratings[i] || ''),
      }))

    return {
      url: document.URL,
      title: document.querySelector('.title')?.textContent || '',
      image:
        document.querySelector('div[id=divabio] > img')?.getAttribute('src') ||
        '',
      books: books,
    }
  })
  console.log(author)
  await browser.close()
  return author
}
