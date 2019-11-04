import React, {useEffect, useState, ComponentType, useCallback} from 'react'
import useCountdown, {TCountdown} from './useCountdown'
import {CountdownView} from '../CountdownView/CountdownView'
import {PartialBy} from '../../utils'

export interface CountdownRenderProps {
  countdown: TCountdown
  targetDateReached: boolean
  targetDate: Date | undefined
}

export interface CountdownProps extends PartialBy<CountdownRenderProps, 'countdown' | 'targetDateReached'> {
  targetDate: Date | undefined
  updateInterval: number
  onTargetDateReachedChange?: (value: boolean) => void
  render?: ComponentType<CountdownRenderProps>
}

function Countdown(props: CountdownProps) {
  const {
    targetDate,
    updateInterval,
    onTargetDateReachedChange,
    render: Render = CountdownView,
    ...restProps
  } = props

  const [targetDateReached, _setTargetDateReached] = useState(false)
  const [countdown, setCountdown] = useCountdown({})

  const setTargetDateReached = useCallback((value: boolean) => {
    _setTargetDateReached(value)
    onTargetDateReachedChange && onTargetDateReachedChange(value)
  }, [onTargetDateReachedChange])

  useEffect(() => {
    if (targetDate) {
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
    }
  }, [setTargetDateReached, setCountdown, targetDate, updateInterval])

  return (
    <Render
      countdown={countdown}
      targetDate={targetDate}
      targetDateReached={targetDateReached}
      {...restProps}
    />
  )
}

Countdown.defaultProps = {
  variant: 'subtitle1',
  component: 'div',
} as Partial<CountdownProps>

export default Countdown
