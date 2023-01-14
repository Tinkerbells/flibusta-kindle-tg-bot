export interface IBook {
  url: string
  title: string
  author: string
  authorLink: string
  image: string
  annotation: string
  size: string
  genres: string
  downloadLinks: string[]
  rate: string
  filePath: string
  fileName: string
}

interface IBookListItem {
  url: string
  title: string
}
