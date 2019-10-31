import useCountdownUnit, {TCountdownUnit} from './useCountdownUnit'
import {useMemo} from 'react'

export type TCountdown = {
  years: TCountdownUnit
  months: TCountdownUnit
  days: TCountdownUnit
  hours: TCountdownUnit
  minutes: TCountdownUnit
  seconds: TCountdownUnit
  milliseconds: TCountdownUnit
}

export type useCountdownParams = {
  years?: number
  months?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}
export type setCountdownParams = Partial<TCountdown> & {
  years?: number
  months?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
  time?: number
}
export type TSetCountdown = (params: setCountdownParams) => void

function useCountdown(params: useCountdownParams): [TCountdown, TSetCountdown] {
  const [years, setYears] = useCountdownUnit({name: 'years', value: params.years})
  const [months, setMonths] = useCountdownUnit({name: 'months', value: params.months})
  const [days, setDays] = useCountdownUnit({name: 'days', value: params.days})
  const [hours, setHours] = useCountdownUnit({name: 'hours', value: params.hours})
  const [minutes, setMinutes] = useCountdownUnit({name: 'minutes', value: params.minutes})
  const [seconds, setSeconds] = useCountdownUnit({name: 'seconds', value: params.seconds})
  const [milliseconds, setMilliseconds] = useCountdownUnit({name: 'milliseconds', value: params.milliseconds})

  return [{
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  }, useMemo<TSetCountdown>(() => (params: setCountdownParams) => {
    const {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
      time,
    } = params
    if (time !== undefined) {
      let unit = time
      setMilliseconds({value: unit % 1000})
      unit = Math.floor(unit / 1000)
      setSeconds({value: unit % 60})
      unit = Math.floor(unit / 60)
      setMinutes({value: unit % 60})
      unit = Math.floor(unit / 60)
      setHours({value: unit % 24})
      unit = Math.floor(unit / 24)
      setDays({value: unit % 30})
      unit = Math.floor(unit / 30)
      setMonths({value: unit % 12})
      unit = Math.floor(unit / 12)
      setYears({value: unit})
    } else {
      if (years !== undefined) setYears({value: years})
      if (months !== undefined) setMonths({value: months})
      if (days !== undefined) setDays({value: days})
      if (hours !== undefined) setHours({value: hours})
      if (minutes !== undefined) setMinutes({value: minutes})
      if (seconds !== undefined) setSeconds({value: seconds})
      if (milliseconds !== undefined) setMilliseconds({value: milliseconds})
    }
  }, [setDays, setHours, setMilliseconds, setMinutes, setMonths, setSeconds, setYears])]
}

export default useCountdown
