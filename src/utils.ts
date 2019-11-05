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

export function formatDate(date: Date) {
  return [
    pad(date.getFullYear(), 4),
    pad(date.getMonth(), 2),
    pad(date.getDate(), 2),
  ].join('\u002D')
}

export function formatTime(date: Date) {
  return [
    pad(date.getHours(), 2),
    pad(date.getMinutes(), 2),
    pad(date.getSeconds(), 2),
  ].join(':')
}

export function parseTime(value: string): [number, number, number] {
  return value.split(':', 3).map(i => parseInt(i, 10)) as [number, number, number]
}

export type CountdownUrlParams = {base?: string, to?: Date, title?: string}

export function countdownUrl(params: CountdownUrlParams) {
  const {
    base = window.location.pathname,
    to,
    title,
  } = params
  const toParam = to ? `to=${to.toISOString()}` : ''
  const titleParam = title ? `title=${title}` : ''
  const entries = [toParam, titleParam].filter(Boolean)
  return `${base}?${entries.join('&')}`
}
