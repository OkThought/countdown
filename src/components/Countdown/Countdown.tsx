import React, {useEffect, useState} from 'react'
import {CountdownView} from '../CountdownView/CountdownView'
import {SECOND} from '../../utils'
import {useLocation} from 'react-router-dom'

export interface CountdownProps {
  targetDate?: Date
  updateInterval?: number
}

function Countdown(props: CountdownProps) {
  const {
    targetDate: controlledTargetDate,
    updateInterval = SECOND / 2,
  } = props

  const location = useLocation()

  const [title, setTitle] = useState('')
  const [finishTime, setFinishTime] = useState(0)
  const [finished, setFinished] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const isTargetDateControlled = controlledTargetDate !== undefined

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
    />
  )
}

Countdown.defaultProps = {
  variant: 'subtitle1',
  component: 'div',
} as Partial<CountdownProps>

export default Countdown
