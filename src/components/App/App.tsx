import {Container, makeStyles, AppBar, Toolbar, Typography, Theme, Button, Link} from '@material-ui/core'
import React, {useState, useEffect, ChangeEvent, useMemo} from 'react'
import Countdown, {CountdownRenderProps} from '../Countdown/Countdown'
import {CountdownView} from '../CountdownView/CountdownView'
import CountdownForm from '../CountdownForm/CountdownForm'
import {
  dateWithoutTime,
  countdownUrl,
  CountdownUrlParams,
  MINUTE,
  formatDate,
  formatTime,
  DAY,
  parseTime, SECOND,
} from '../../utils'

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appBar: {},
  link: {
    color: 'inherit',
    margin: theme.spacing(0.5),
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  footer: {
    textAlign: 'center',
  },
}))

function App(props: {}) {
  const now = new Date()
  const [title, setTitle] = useState('')
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined)
  const [newTargetDate, setNewTargetDate] = useState<Date | undefined>(targetDate)
  const [targetDateReached, setTargetDateReached] = useState(targetDate === undefined)
  const links = useMemo<Array<CountdownUrlParams & { label?: string }>>(() => {
    const tomorrow = new Date(now.getTime() + DAY)

    return [{
      label: 'New',
    }, {
      to: new Date(now.getFullYear() + 1, 1, 1, 0, 0, 0, 0),
      title: 'New Year',
    }, {
      to: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0, 0),
      title: 'Midnight',
    }, {
      to: new Date(now.getTime() + 5 * MINUTE),
      title: '5 minutes',
    }]
  }, [now])

  useEffect(() => {
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (key === 'to') {
        setTargetDate(new Date(value))
      } else if (key === 'title') {
        setTitle(value)
      }
    })

  }, [])

  const newLocation = newTargetDate && countdownUrl({to: newTargetDate, title})

  useEffect(() => {
    setTargetDateReached(targetDate === undefined)
  }, [targetDate])

  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='sticky'>
        <Toolbar>
          {links.map(({title, label = title, ...restParams}) =>
            <Typography variant='h6' color='initial' key={label}>
              <Button
                className={classes.link}
                href={countdownUrl({title, ...restParams})}
              >
                {label}
              </Button>
            </Typography>,
          )}
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        {targetDateReached ? (
          <div className={classes.form}>
            <CountdownForm
              titleProps={{
                value: title,
                onChange: ({target: {value}}) => setTitle(value),
              }}
              dateProps={{
                value: newTargetDate ? formatDate(newTargetDate) : '',
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  const oldDate = newTargetDate ? new Date(newTargetDate) : dateWithoutTime()
                  const newDate = e.target.valueAsDate
                  if (newDate) {
                    oldDate.setFullYear(
                      newDate.getFullYear(),
                      newDate.getMonth(),
                      newDate.getDate(),
                    )
                    setNewTargetDate(oldDate)
                  } else {
                    setNewTargetDate(undefined)
                  }
                },
              }}
              timeProps={{
                value: newTargetDate ? formatTime(newTargetDate) : '',
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  const oldDate = newTargetDate ? new Date(newTargetDate) : new Date()
                  const {value} = e.target
                  if (value) {
                    //noinspection TypeScriptValidateTypes
                    oldDate.setHours(...parseTime(e.target.value))
                    setNewTargetDate(oldDate)
                  } else {
                    setNewTargetDate(newTargetDate ? dateWithoutTime(newTargetDate) : undefined)
                  }
                },
              }}
              submitProps={{
                disabled: !newLocation,
                href: newLocation!,
              }}
            />
          </div>
        ) : (
          <div className={classes.view}>
            <Countdown
              targetDate={targetDate}
              updateInterval={SECOND/2}
              onTargetDateReachedChange={setTargetDateReached}
              render={(props: CountdownRenderProps) => (
                <CountdownView
                  {...props}
                  title={title}
                />
              )}
            />
          </div>
        )
        }
      </Container>
      <Container className={classes.footer}>
        <Typography color='textSecondary' variant='caption' component='div'>
          {'Made with ❤️ by '}
          <Link color='textSecondary' href='https://github.com/OkThought'>Ivan</Link>
        </Typography>
        <Typography color='textSecondary' variant='caption' component='div'>
          {'Icons made by '}
          <Link color='textSecondary' href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</Link>
          {' from '}
          <Link color='textSecondary' href="https://www.flaticon.com/" title="Flaticon">flaticon.com</Link>
        </Typography>
      </Container>
    </div>
  )
}

export default App
