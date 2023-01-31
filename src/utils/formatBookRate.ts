export const formatBookRate = (rate: string) => {
  return rate.length > 1
    ? rate
        .split(',')
        .filter((_, i) => i != 1)
        .join(',')
    : 'Оценки: отсутствуют'
}
