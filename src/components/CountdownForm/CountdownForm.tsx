import React from 'react'
import {TextField, Button, makeStyles, Theme} from '@material-ui/core'
import {OutlinedTextFieldProps} from '@material-ui/core/TextField'
import {ButtonProps} from '@material-ui/core/Button'

export interface CountdownFormProps {
  titleProps: Partial<OutlinedTextFieldProps>
  dateProps: Partial<OutlinedTextFieldProps>
  timeProps: Partial<OutlinedTextFieldProps>
  submitProps: ButtonProps
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
    submitProps,
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
        <TextField
          {...{
            className: classes.date,
            variant: 'outlined',
            label: 'Date',
            InputLabelProps: {
              shrink: true,
            },
            InputProps: {
              inputProps: {
                type: 'date',
              },
            },
            ...dateProps,
          }}
        />
        <TextField
          {...{
            className: classes.time,
            variant: 'outlined',
            label: 'Time',
            InputLabelProps: {
              shrink: true,
            },
            InputProps: {
              inputProps: {
                type: 'time',
              },
            },
            ...timeProps,
          }}
        />
      </div>
      <Button
        {...{
          className: classes.submit,
          ...submitProps,
        }}
      >
        Start
      </Button>
    </div>
  )
}

export default CountdownForm
