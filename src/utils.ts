export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR

export function dateWithoutTime(date?: Date) {
  const result = date ? new Date(date) : new Date()
  result.setHours(12, 0, 0, 0)
  return result
}

export function pad(num: number, places: number, character = '0') {
  return String(num).padStart(places, character)
}

export const DATE_DELIMITER = '\u002D'

export function formatDate(date: Date) {
  return [
    pad(date.getFullYear(), 4),
    pad(date.getMonth(), 2),
    pad(date.getDate(), 2),
  ].join(DATE_DELIMITER)
}

export const TIME_DELIMITER = '\u003A'

export function formatTime(date: Date) {
  return [
    pad(date.getHours(), 2),
    pad(date.getMinutes(), 2),
    pad(date.getSeconds(), 2),
  ].join(TIME_DELIMITER)
}

export function parseYMD(value: string): [number, number, number] {
  return value.split(DATE_DELIMITER, 3).map(i => parseInt(i, 10)) as [number, number, number]
}

export function parseHMS(value: string): [number, number, number] {
  return value.split(TIME_DELIMITER, 3).map(i => parseInt(i, 10)) as [number, number, number]
}

export type CountdownUrlParams = {
  to?: Date | number | string
  title?: string
}

export function countdownUrl(params: CountdownUrlParams) {
  const {
    to,
    title,
  } = params
  const toDate = to ? to instanceof Date ? to : new Date(to) : undefined
  const titleParam = title ? `title=${title}` : ''
  const entries = [
    toDate ? `to=${toDate.toISOString()}` : '',
    titleParam,
  ].filter(Boolean)
  return `/?${entries.join('&')}`
}
