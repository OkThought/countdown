import React, {ReactNode} from 'react'
import {TextField, Button, makeStyles, Theme} from '@material-ui/core'
import {OutlinedTextFieldProps} from '@material-ui/core/TextField'
import {ButtonProps} from '@material-ui/core/Button'
import {MuiPickersUtilsProvider, TimePicker, DatePicker, DatePickerProps, TimePickerProps} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

export interface CountdownFormProps {
  titleProps: Partial<OutlinedTextFieldProps>
  dateProps: DatePickerProps
  timeProps: TimePickerProps
  submit?: ReactNode
  submitProps?: ButtonProps
}

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    margin: theme.spacing(.5),
  },
  datetimeContainer: {
    display: 'flex',
    alignItems: 'stretch',
    alignContent: 'stretch',
    flexWrap: 'wrap',
  },
  date: {
    margin: theme.spacing(.5),
    flexGrow: 1,
  },
  time: {
    margin: theme.spacing(.5),
    flexGrow: 1,
  },
  submit: {
    margin: theme.spacing(.5),
  },
}))

function CountdownForm(props: CountdownFormProps) {
  const {
    titleProps,
    dateProps,
    timeProps,
    submitProps = {},
    submit,
  } = props

  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <TextField
        {...{
          className: classes.title,
          variant: 'outlined',
          label: 'Title',
          ...titleProps,
        }}
      />
      <div className={classes.datetimeContainer}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            {...{
              className: classes.date,
              inputVariant: 'outlined',
              variant: 'dialog',
              label: 'Date',
              format: 'yyyy MMMM do',
              InputLabelProps: {
                shrink: true,
              },
              ...dateProps,
            }}
          />
          <TimePicker
            {...{
              className: classes.time,
              inputVariant: 'outlined',
              variant: 'dialog',
              label: 'Time',
              InputLabelProps: {
                shrink: true,
              },
              ...timeProps,
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      {submit || (
        <Button
          {...{
            className: classes.submit,
            ...submitProps,
          }}
        >
          Start
        </Button>
      )}
    </div>
  )
}

export default CountdownForm
