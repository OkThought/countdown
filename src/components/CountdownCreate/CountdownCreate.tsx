import React, {useState, useEffect, useCallback, useMemo, ChangeEvent} from 'react'
import {countdownPath} from '../../utils'
import CountdownForm, {CountdownFormProps} from '../CountdownForm/CountdownForm'
import {useLocation, useHistory, Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date'

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
  const [timestamp, setTimestamp] = useState<number>(NaN)

  const datetime = useMemo(() => isNaN(timestamp) ? null : new Date(timestamp), [timestamp])

  const newLocation = useMemo(() => {
    return datetime === null ? undefined : countdownPath({to: datetime, title})
  }, [datetime, title])

  const setSearchParam = useCallback((key: string, value: string) => {
    const newSearch = new URLSearchParams(location.search)
    if (value) {
      newSearch.set(key, value)
    } else {
      newSearch.delete(key)
    }
    history.location.search = newSearch.toString()
    history.replace(history.location)
  }, [history, location])

  const handleTitleChange = useCallback(({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setTitle(value)
    setSearchParam('title', value)
  }, [setSearchParam])

  const handleDatetimeAccept = useCallback((date: MaterialUiPickersDate | null) => {
    const ts = date ? date.getTime() : NaN
    setTimestamp(ts)
    setSearchParam('tots', isNaN(ts) ? '' : ts.toString())
  }, [setSearchParam])

  useEffect(() => {
    document.title = title || 'New Countdown'
  }, [title])

  useEffect(() => {
    let ts = NaN
    let title = ''
    new URLSearchParams(location.search).forEach((value, key) => {
      if (key === 'tots') {
        ts = parseInt(value, 10) || ts
      } else if (key === 'title') {
        title = value
      }
    })
    setTitle(title)
    setTimestamp(ts)
  }, [location.search])

  return (
    <CountdownForm
      titleProps={{
        value: title,
        onChange: handleTitleChange,
      }}
      dateProps={{
        value: datetime,
        onChange: handleDatetimeAccept,
      }}
      timeProps={{
        value: datetime,
        onChange: handleDatetimeAccept,
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
