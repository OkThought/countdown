import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {parseYMD, parseHMS, countdownPath, formatDate, formatTime} from '../../utils'
import CountdownForm, {CountdownFormProps} from '../CountdownForm/CountdownForm'
import {useLocation, useHistory, Link} from 'react-router-dom'
import {Button} from '@material-ui/core'

type omitKeys =
  | 'titleProps'
  | 'dateProps'
  | 'timeProps'
  | 'submitProps'
export interface CountdownCreateProps extends Omit<CountdownFormProps, omitKeys> {

}

function CountdownCreate(props: CountdownCreateProps) {
  const {...restProps} = props
  const location = useLocation()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [dateInputString, setDateInputString] = useState('')
  const [timeInputString, setTimeInputString] = useState('')
  const [datetime, setDatetime] = useState<Date | null>(null)

  const datetimeValue = datetime && datetime.getTime()

  const setSearchParam = useCallback((key: string, value: string) => {
    const newSearch = new URLSearchParams(location.search)
    newSearch.set(key, value)
    history.location.search = newSearch.toString()
    history.replace(history.location)
  }, [history, location])

  const newLocation = useMemo(() => {
    return datetimeValue === null ? undefined : countdownPath({to: datetimeValue, title})
  }, [datetimeValue, title])

  useEffect(() => {
    window.document.title = title || 'New Countdown'
  }, [title])

  useEffect(() => {
    new URLSearchParams(location.search).forEach((value, key) => {
      if (key === 'date') {
        setDateInputString(value)
      } else if (key === 'time') {
        setTimeInputString(value)
      } else if (key === 'title') {
        setTitle(value)
      }
    })
  }, [location.search])

  useEffect(() => {
    let newDatetime: Date | null = null
    if (dateInputString) {
      const [year, month, dayOfTheMonth] = parseYMD(dateInputString)
      newDatetime = new Date(year, month - 1, dayOfTheMonth)
    }
    setDatetime(newDatetime)
  }, [dateInputString])

  useEffect(() => {
    if (datetimeValue) {
      const newDatetime = new Date(datetimeValue)
      if (timeInputString) {
        const [hours, minutes, seconds = 0] = parseHMS(timeInputString)
        newDatetime.setHours(hours, minutes, seconds)
      } else {
        newDatetime.setHours(0)
      }
      setDatetime(newDatetime)
    }
  }, [datetimeValue, timeInputString])

  return (
    <CountdownForm
      titleProps={{
        value: title,
        onChange: ({target: {value}}) => {
          setTitle(value)
          setSearchParam('title', value)
        },
      }}
      dateProps={{
        value: datetime,
        onChange: (date) => {
          setDatetime(date)
          setDateInputString(date ? formatDate(date) : '')
          setSearchParam('date', date ? formatDate(date) : '')
        },
      }}
      timeProps={{
        value: datetime,
        onChange: (date) => {
          setDatetime(date)
          setTimeInputString(date ? formatTime(date) : '')
          setSearchParam('time', date ? formatTime(date) : '')
        },
      }}
      submit={newLocation === undefined ?
        <Button disabled>Start</Button>
        :
        <Button
          component={Link}
          to={newLocation}
        >
          Start
        </Button>
      }
      {...restProps}
    />
  )
}

export default CountdownCreate
