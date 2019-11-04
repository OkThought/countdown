import React from 'react'
import {Typography} from '@material-ui/core'
import {CountdownRenderProps} from '../Countdown/Countdown'
import {pad} from '../../utils'

// noinspection TypeScriptValidateTypes
// const useStyles = makeStyles((theme: Theme) => ({
//   countdownUnit: {
//     display: 'inline-flex',
//     padding: theme.spacing(.5),
//   },
//   countdownUnitValue: {
//     marginLeft: theme.spacing(.5),
//     marginRight: theme.spacing(.5),
//   },
//   countdownUnitLabel: {
//     marginLeft: theme.spacing(.5),
//     marginRight: theme.spacing(.5),
//   },
// }))

export interface CountdownViewProps extends CountdownRenderProps {
  title?: string
}

export function CountdownView(props: CountdownViewProps) {
  const {
    countdown,
    title,
  } = props

  return (
    <>
      {title && (
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
      )}
      <Typography variant='subtitle1'>
        {countdown.years.value} years, {countdown.months.value} months, {countdown.days.value} days
      </Typography>
      <Typography variant='subtitle1'>
        {pad(countdown.hours.value, 2)}:{pad(countdown.minutes.value, 2)}:{pad(countdown.seconds.value, 2)}.{pad(countdown.milliseconds.value, 3)}
      </Typography>
    </>
  )
}
