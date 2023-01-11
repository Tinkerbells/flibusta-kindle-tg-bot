export interface IBook {
  href: string
  title: string
  author: string
  authorLink: string
  image: string
  annotation: string
  size: string
  genres: string
  downloadLinks: string[]
  rate: string
}

interface IBookListItem {
  href: string
  title: string
}
