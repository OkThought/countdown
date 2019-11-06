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

  const [targetDate, setTargetDate] = useState(controlledTargetDate)
  const [title, setTitle] = useState('')
  const [targetDateReached, setTargetDateReached] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const isTargetDateControlled = controlledTargetDate !== undefined

  useEffect(() => {
    if (!isTargetDateControlled) {
      new URLSearchParams(location.search).forEach((value, key) => {
        if (key === 'to') {
          setTargetDate(new Date(value))
        } else if (key === 'title') {
          setTitle(value)
        }
      })
    }
  }, [isTargetDateControlled, location.search])

  useEffect(() => {
    if (targetDate && !targetDateReached) {
      const handle = setInterval(() => {
        const now = new Date()
        const timeLeft = targetDate.getTime() - now.getTime()
        if (timeLeft <= 0) {
          setTargetDateReached(true)
        } else {
          setCountdown(timeLeft)
        }
      }, updateInterval)

      return () => clearInterval(handle)
    }
  }, [setTargetDateReached, setCountdown, targetDate, updateInterval, targetDateReached])

  useEffect(() => {
    window.document.title = title || 'Countdown'
  }, [title])

  return (
    <CountdownView
      title={title}
      countdown={countdown}
      targetDate={targetDate}
      targetDateReached={targetDateReached}
    />
  )
}

Countdown.defaultProps = {
  variant: 'subtitle1',
  component: 'div',
} as Partial<CountdownProps>

export default Countdown
