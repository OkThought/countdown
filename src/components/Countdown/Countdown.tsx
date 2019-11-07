import React, {useEffect, useState, useMemo} from 'react'
import {CountdownView} from '../CountdownView/CountdownView'
import {SECOND} from '../../utils'
import {useLocation} from 'react-router-dom'

export interface CountdownProps {
  targetDate?: Date
  updateInterval?: number
}

const FREQUENT_THRESHOLD = 10 * SECOND
const FREQUENT = SECOND / 20
const INFREQUENT = SECOND / 2

function Countdown(props: CountdownProps) {
  const {
    targetDate: controlledTargetDate,
    updateInterval: controlledUpdateInterval,
  } = props

  const location = useLocation()

  const [title, setTitle] = useState('')
  const [finishTime, setFinishTime] = useState(0)
  const [finished, setFinished] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const isTargetDateControlled = controlledTargetDate !== undefined

  const updateInterval = useMemo(() => {
    return controlledUpdateInterval !== undefined ? controlledUpdateInterval :
      countdown > FREQUENT_THRESHOLD ? INFREQUENT : FREQUENT
  }, [controlledUpdateInterval, countdown])

  const includeMilliseconds = useMemo(() => {
    return updateInterval === FREQUENT
  }, [updateInterval])

  useEffect(() => {
    if (!isTargetDateControlled) {
      new URLSearchParams(location.search).forEach((value, key) => {
        if (key === 'to') {
          setFinishTime(new Date(value).getTime())
        } else if (key === 'from') {
          const milliseconds = parseInt(value, 10)
          if (!isNaN(milliseconds)) {
            setFinishTime(Date.now() + milliseconds)
          }
        } else if (key === 'title') {
          setTitle(value)
        }
      })
    }
  }, [isTargetDateControlled, location.search])

  useEffect(() => {
    if (!finished) {
      const handle = setInterval(() => {
        const millisecondsLeft = finishTime - Date.now()
        if (millisecondsLeft <= 0) {
          setFinished(true)
          setCountdown(0)
        } else {
          setCountdown(millisecondsLeft)
        }
      }, updateInterval)
      return () => clearInterval(handle)
    }
  }, [setCountdown, updateInterval, finished, finishTime])

  useEffect(() => {
    window.document.title = title || 'Countdown'
  }, [title])

  return (
    <CountdownView
      title={title}
      countdown={countdown}
      includeMilliseconds={includeMilliseconds}
    />
  )
}

Countdown.defaultProps = {
  variant: 'subtitle1',
  component: 'div',
} as Partial<CountdownProps>

export default Countdown
