import React from 'react'
import {Typography, TextField, Button, makeStyles, Theme} from '@material-ui/core'
import {TextFieldProps} from '@material-ui/core/TextField'
import {formatDate} from '../../utils'
import {ButtonProps} from '@material-ui/core/Button'

export interface CountdownFormProps {
  title: string
  onTitleChange: TextFieldProps['onChange']
  newTargetDate: Date | undefined
  onNewTargetDateChange: TextFieldProps['onChange']
  submitDisabled?: boolean
  onSubmit: ButtonProps['onClick']
}

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
  submit: {
    margin: theme.spacing(.5),
  },
}))

function CountdownForm(props: CountdownFormProps) {
  const {
    title,
    onTitleChange,
    newTargetDate,
    onNewTargetDateChange,
    submitDisabled,
    onSubmit,
  } = props

  const classes = useStyles(props)

  return (
    <>
      <Typography variant='h5' component='div'>
        <TextField
          className={classes.title}
          variant='outlined'
          label='Title'
          value={title}
          onChange={onTitleChange}
        />
      </Typography>
      <Typography variant='subtitle1' component='div'>
        <TextField
          className={classes.date}
          variant='outlined'
          label='Date'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: {
              type: 'date',
            },
          }}
          onChange={onNewTargetDateChange}
          value={newTargetDate ? formatDate(newTargetDate) : ''}
        />
      </Typography>
      <Button
        className={classes.submit}
        disabled={submitDisabled}
        onClick={onSubmit}
      >
        Start
      </Button>
    </>
  )
}

export default CountdownForm
