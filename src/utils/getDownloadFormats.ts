export const getDownloadFormats = (downloadLinks: string[]) => {
  const fileFormats = ['fb2', 'epub', 'mobi', 'pdf', 'djvu']
  return downloadLinks
    .map((link) => link.replace(/.*\//, ''))
    .filter((format) => fileFormats.includes(format))
}
