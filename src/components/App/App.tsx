import {Container, makeStyles, AppBar, Toolbar, Link, Typography, Theme} from '@material-ui/core'
import React, {useState, useEffect, ChangeEvent, useMemo} from 'react'
import Countdown, {CountdownRenderProps} from '../Countdown/Countdown'
import {CountdownView} from '../CountdownView/CountdownView'
import CountdownForm from '../CountdownForm/CountdownForm'
import {dateWithoutTime, countdownUrl, CountdownUrlParams, MINUTE} from '../../utils'

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  appBar: {},
  link: {
    color: 'inherit',
    margin: theme.spacing(0.5)
  },
  content: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

function App(props: {}) {
  const now = new Date()
  const [title, setTitle] = useState('')
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined)
  const [newTargetDate, setNewTargetDate] = useState<Date | undefined>(targetDate)
  const [targetDateReached, setTargetDateReached] = useState(targetDate === undefined)
  const links = useMemo<Array<CountdownUrlParams & { label?: string }>>(() => {
    return [{
      title: 'Countdown',
      label: 'New',
    }, {
      to: new Date(now.getFullYear(), 12, 31, 23, 59, 59, 999),
      title: 'New Year',
    }, {
      to: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999),
      title: 'Midnight',
    }, {
      to: new Date(now.getTime() + 5 * MINUTE),
      title: '5 minutes',
    }]
  }, [now])

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

  const newLocation = newTargetDate && countdownUrl({to: newTargetDate, title})

  useEffect(() => {
    setTargetDateReached(targetDate === undefined)
  }, [targetDate])

  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          {links.map(({title, label = title, ...restParams}) =>
            <Typography variant='h6' color='initial' key={label}>
              <Link
                className={classes.link}
                href={countdownUrl({title, ...restParams})}
              >
                {label}
              </Link>
            </Typography>,
          )}
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
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
    </div>
  )
}

export default App
