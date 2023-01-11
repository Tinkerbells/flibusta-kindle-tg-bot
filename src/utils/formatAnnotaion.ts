import { ANNOTATION_LIMIT } from '../consts'

export const formatAnnotaion = (annotation: string) => {
  return annotation.length > ANNOTATION_LIMIT
    ? annotation
        .split(' ')
        .slice(0, ANNOTATION_LIMIT)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim() + '...'
    : annotation
}
