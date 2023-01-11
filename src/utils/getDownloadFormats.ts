export const getDownloadFormats = (downloadLinks: string[]) => {
  const fileFormats = ['fb2', 'epub', 'mobi', 'download'] // download is pdf format represented on flibusta
  return downloadLinks
    .map((link) => link.replace(/.*\//, ''))
    .filter((format) => fileFormats.includes(format))
}
