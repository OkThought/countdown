import React from 'react'
import {Typography, TextField, Button} from '@material-ui/core'
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

function CountdownForm(props: CountdownFormProps) {
  const {
    title,
    onTitleChange,
    newTargetDate,
    onNewTargetDateChange,
    submitDisabled,
    onSubmit,
  } = props

  return (
    <>
      <Typography variant='h5' component='div'>
        <TextField
          variant='outlined'
          value={title}
          onChange={onTitleChange}
        />
      </Typography>
      <Typography variant='subtitle1' component='div'>
        <TextField
          variant='outlined'
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
        disabled={submitDisabled}
        onClick={onSubmit}
      >
        Start
      </Button>
    </>
  )
}

export default CountdownForm
