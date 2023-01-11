export const createInitialData = () => {
  return {
    kindleEmail: '',
    page: 1,
    book: {
      href: '',
      title: '',
      author: '',
      authorLink: '',
      image: '',
      annotation: '',
      size: '',
      genres: '',
      downloadLinks: [],
      rate: '',
      filePath: '',
      fileName: '',
    },
    books: [],
    bookFilePath: '',
    bookFileName: '',
    bookFileExtension: '',
  }
}
