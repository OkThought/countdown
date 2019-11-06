import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {parseYMD, parseHMS, countdownUrl} from '../../utils'
import CountdownForm, {CountdownFormProps} from '../CountdownForm/CountdownForm'
import {useLocation, useHistory} from 'react-router-dom'

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
  const [datetime, setNewTargetDate] = useState<Date | undefined>(undefined)

  const datetimeValue = datetime && datetime.getTime()

  const setSearchParam = useCallback((key: string, value: string) => {
    const newSearch = new URLSearchParams(location.search)
    newSearch.set(key, value)
    history.location.search = newSearch.toString()
    history.replace(history.location)
  }, [history, location])

  const newLocation = useMemo(() => {
    return datetimeValue === undefined ? undefined : countdownUrl({to: datetimeValue, title})
  }, [datetimeValue, title])

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
    let newDatetime: Date | undefined = undefined
    if (dateInputString) {
      const [year, month, dayOfTheMonth] = parseYMD(dateInputString)
      newDatetime = new Date(year, month - 1, dayOfTheMonth)
    }
    setNewTargetDate(newDatetime)
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
      setNewTargetDate(newDatetime)
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
        value: dateInputString,
        onChange: ({target: {value}}) => {
          setDateInputString(value)
          setSearchParam('date', value)
        },
      }}
      timeProps={{
        value: timeInputString,
        onChange: ({target: {value}}) => {
          setTimeInputString(value)
          setSearchParam('time', value)
        },
      }}
      submitProps={{
        disabled: !newLocation,
        href: newLocation,
      }}
      {...restProps}
    />
  )
}

export default CountdownCreate
