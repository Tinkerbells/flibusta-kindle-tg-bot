export interface IAuthor {
  image: string
  title: string
  books: IAuthorBook[]
}

export interface IAuthorBook {
  url: string
  title: string
  rate?: number
}

export interface IAuthorListItem {
  url: string
  title: string
}
