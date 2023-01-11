export const getExtension = (fileName: string) => {
  console.log(fileName)
  return fileName.split('.').pop()
}
