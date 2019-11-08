import React, {useEffect, useState, useMemo} from 'react'
import {CountdownView} from '../CountdownView/CountdownView'
import {SECOND} from '../../utils'
import {useLocation} from 'react-router-dom'

export interface CountdownProps {
  updateInterval?: number
}

const FREQUENT_THRESHOLD = 10 * SECOND
const FREQUENT = SECOND / 20
const INFREQUENT = SECOND / 2

function Countdown(props: CountdownProps) {
  const {
    updateInterval: updateIntervalControlled,
  } = props

  const location = useLocation()

  const [title, titleSet] = useState('')
  const [finishHandlers, finishHandlersSet] = useState<Array<() => void>>([])
  const [finishTime, finishTimeSet] = useState(-1)
  const [finished, finishedSet] = useState(false)
  const [countdown, countdownSet] = useState<number>(0)

  const updateInterval = useMemo(() => {
    return updateIntervalControlled !== undefined ? updateIntervalControlled :
      countdown > FREQUENT_THRESHOLD ? INFREQUENT : FREQUENT
  }, [updateIntervalControlled, countdown])

  const includeMilliseconds = useMemo(() => updateInterval === FREQUENT, [updateInterval])
  const started = useMemo(() => finishTime > 0, [finishTime])

  useEffect(() => {
    let finishTimeNew = Date.now()
    let titleNew = ''
    const finishHandlersNew = [
      () => finishedSet(true),
      () => countdownSet(0),
    ]
    new URLSearchParams(location.search).forEach((value, key) => {
      if (key === 'to') {
        finishTimeNew = Date.parse(value)
      } else if (key === 'from') {
        const milliseconds = parseInt(value, 10)
        if (!isNaN(milliseconds)) {
          finishTimeNew = Date.now() + milliseconds
        }
      } else if (key === 'title') {
        titleNew = value
      } else if (key === 'finish_title') {
        finishHandlersNew.push(() => titleSet(value))
      } else if (key === 'finish_redirect') {
        finishHandlersNew.push(() => {
          window.location.href = value
        })
      }
    })
    finishTimeSet(finishTimeNew)
    titleSet(titleNew)
    finishHandlersSet(finishHandlersNew)
    finishedSet(false)
  }, [location.search])

  useEffect(() => {
    if (started && !finished) {
      const handle = setInterval(() => {
        const millisecondsLeft = finishTime - Date.now()
        if (millisecondsLeft <= 0) {
          for (const handler of finishHandlers) {
            handler()
          }
        } else {
          countdownSet(millisecondsLeft)
        }
      }, updateInterval)
      return () => clearInterval(handle)
    }
  }, [countdownSet, updateInterval, finished, finishTime, finishHandlers, countdown, started])

  useEffect(() => {
    window.document.title = title || 'Countdown'
  }, [title])

  return (!started ? null :
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
