import React from 'react'
import {Typography, makeStyles, Theme} from '@material-ui/core'
import {CountdownRenderProps} from '../Countdown/Countdown'
import {pad} from '../../utils'

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  title: {
    padding: theme.spacing(.5),
  },
  date: {
    margin: theme.spacing(.5),
  },
  time: {
    margin: theme.spacing(.5),
  },
}))

export interface CountdownViewProps extends CountdownRenderProps {
  title?: string
}

export function CountdownView(props: CountdownViewProps) {
  const {
    countdown,
    title,
  } = props

  const classes = useStyles(props)

  return (
    <>
      {title && (
        <Typography className={classes.title} variant='h5' component='div'>
          {title}
        </Typography>
      )}
      <Typography className={classes.date} variant='subtitle1'>
        {countdown.years.value} years, {countdown.months.value} months, {countdown.days.value} days
      </Typography>
      <Typography className={classes.time} variant='subtitle1'>
        {pad(countdown.hours.value, 2)}
        :
        {pad(countdown.minutes.value, 2)}
        :
        {pad(countdown.seconds.value, 2)}
        .
        {pad(countdown.milliseconds.value, 3)}
      </Typography>
    </>
  )
}
