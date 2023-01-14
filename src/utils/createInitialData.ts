export const createInitialData = () => {
  return {
    back: '',
    userId: '',
    kindleEmail: '',
    page: 1,
    book: {
      url: '',
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
    author: { url: '', title: '', books: [] },
    authors: [],
  }
}
