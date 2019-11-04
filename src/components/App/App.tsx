import {Container, makeStyles, Theme} from '@material-ui/core'
import React, {useState, useEffect, ChangeEvent} from 'react'
import Countdown, {CountdownRenderProps} from '../Countdown/Countdown'
import {CountdownView} from '../CountdownView/CountdownView'
import CountdownForm from '../CountdownForm/CountdownForm'
import {dateWithoutTime} from '../../utils'

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    verticalAlign: 'center',
    textAlign: 'center',
  },
}))

function App(props: {}) {
  const [title, setTitle] = useState('Countdown')
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined)
  const [newTargetDate, setNewTargetDate] = useState<Date | undefined>(targetDate)

  useEffect(() => {
    let date = dateWithoutTime()

    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (key === 'to') {
        date = new Date(value)
      } else if (key === 'title') {
        setTitle(value)
      }
    })

    setTargetDate(date)
  }, [])

  const [targetDateReached, setTargetDateReached] = useState(targetDate === undefined)
  const newLocation = newTargetDate && `${window.location.pathname}?to=${newTargetDate.toISOString()}&title=${title}`

  useEffect(() => {
    setTargetDateReached(targetDate === undefined)
  }, [targetDate])

  const classes = useStyles(props)

  return (
    <Container className={classes.root}>
      {targetDateReached ? (
          <CountdownForm
            title={title}
            onTitleChange={({target: {value}}) => setTitle(value)}
            newTargetDate={newTargetDate}
            onNewTargetDateChange={(e: ChangeEvent<HTMLInputElement>) => {
              const oldDate = newTargetDate ? new Date(newTargetDate) : dateWithoutTime()
              const newDate = e.target.valueAsDate || dateWithoutTime()
              console.log(e.target.value, e.target.valueAsDate, newDate)
              oldDate.setFullYear(newDate.getFullYear())
              oldDate.setMonth(newDate.getMonth())
              oldDate.setDate(newDate.getDate())
              setNewTargetDate(oldDate)
            }}
            onSubmit={() => window.location.assign(newLocation!)}
            submitDisabled={!newLocation}
          />
        ) : (
        <Countdown
          targetDate={targetDate}
          updateInterval={0}
          onTargetDateReachedChange={setTargetDateReached}
          render={(props: CountdownRenderProps) => (
            <CountdownView
              {...props}
              title={title}
            />
          )}
        />
      )
      }
    </Container>
  )
}

export default App
