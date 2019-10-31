import React, {useEffect, useState} from 'react'
import {Typography, makeStyles, Theme} from '@material-ui/core'
import {TypographyProps} from '@material-ui/core/Typography'
import useCountdown from './useCountdown'
import {DAY, SECOND} from '../../utils'

export interface CountdownProps extends TypographyProps {

}

// noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  countdownUnit: {
    display: 'inline-flex',
    padding: theme.spacing(.5),
  },
  countdownUnitValue: {
    marginLeft: theme.spacing(.5),
    marginRight: theme.spacing(.5),
  },
  countdownUnitLabel: {
    marginLeft: theme.spacing(.5),
    marginRight: theme.spacing(.5),
  },
}))

const updateIntervals = {
  years: SECOND / 2,
  months: SECOND / 2,
  days: SECOND / 2,
  hours: SECOND / 2,
  minutes: SECOND / 2,
  seconds: SECOND / 2,
  milliseconds: 0,
} as Record<string, number>

function Countdown(props: CountdownProps) {
  const {
    ...restProps
  } = props

  const [targetDate, setTargetDate] = useState(() => new Date())
  const [updateInterval, setUpdateInterval] = useState(SECOND / 2)
  const [targetDateReached, setTargetDateReached] = useState(false)
  const [countdown, setCountdown] = useCountdown({})

  useEffect(() => {
    const now = new Date()
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    let updateInterval: number = DAY

    new URLSearchParams(window.location.search).forEach((value, key) => {
      const floatValue = parseFloat(value)
      if (!isNaN(floatValue)) {
        if (key === 'to') {
          date.setTime(floatValue)
          updateInterval = Math.min(updateInterval, updateIntervals.milliseconds)
        } else if (key === 'year') {
          date.setFullYear(floatValue)
          updateInterval = Math.min(updateInterval, updateIntervals.years)
        } else if (key === 'month') {
          date.setMonth(floatValue)
          updateInterval = Math.min(updateInterval, updateIntervals.months)
        } else if (key === 'day') {
          date.setDate(floatValue)
          updateInterval = Math.min(updateInterval, updateIntervals.days)
        } else if (key === 'hour') {
          date.setHours(floatValue)
          updateInterval = Math.min(updateInterval, updateIntervals.hours)
        } else if (key === 'minute') {
          date.setMinutes(floatValue)
          updateInterval = Math.min(updateInterval, updateIntervals.minutes)
        } else if (key === 'second') {
          date.setSeconds(floatValue)
          updateInterval = Math.min(updateInterval, updateIntervals.seconds)
        } else if (key === 'millisecond') {
          date.setMilliseconds(floatValue)
          updateInterval = Math.min(updateInterval, updateIntervals.milliseconds)
        }
      }
    })

    setUpdateInterval(updateInterval)
    setTargetDate(date)
  }, [])

  useEffect(() => {
    const handle = setInterval(() => {
      const now = new Date()
      const timeLeft = targetDate.getTime() - now.getTime()
      if (timeLeft <= 0) {
        setTargetDateReached(true)
      } else {
        setCountdown({time: timeLeft})
      }
    }, updateInterval)
    return () => clearInterval(handle)
  }, [setTargetDateReached, setCountdown, targetDate, updateInterval])

  const classes = useStyles(props)

  return (
    <Typography
      className={classes.root}
      {...restProps}
    >
      {targetDateReached ?
        'Reached!'
        :
        Object.entries(countdown)
          .filter(([_, unit]) => unit.value > 0)
          .flatMap(([key, unit]) => updateInterval <= updateIntervals[key] ? [
            <div className={classes.countdownUnit} key={key}>
              <span className={classes.countdownUnitValue}>
                {unit.value}
              </span>
              <span className={classes.countdownUnitLabel}>
                {unit.name}
              </span>
            </div>
          ] : [])
      }
    </Typography>
  )
}

Countdown.defaultProps = {
  variant: 'subtitle1',
  component: 'div',
} as Partial<CountdownProps>

export default Countdown
