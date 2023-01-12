export const getExtension = (fileName: string) => {
  return fileName.split('.').pop()
}
