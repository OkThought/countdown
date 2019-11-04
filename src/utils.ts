export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR

export function formatDate(date: Date) {
  console.log('format', date.toISOString().slice(0, 'yyyy-mm-dd'.length))
  return date.toISOString().slice(0, 'yyyy-mm-dd'.length)
}

export function dateWithoutTime(date?: Date) {
  const _date = date || new Date()
  return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate(), 12)
}

export function pad(num: number, places: number, character = '0') {
  return String(num).padStart(places, character)
}
