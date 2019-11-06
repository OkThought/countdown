import React from 'react'
import {Typography, Link, Container, makeStyles} from '@material-ui/core'
import {ContainerProps} from '@material-ui/core/Container'

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
})

export interface AppFooterProps extends ContainerProps {

}

function Footer(props: AppFooterProps) {
  const {...restProps} = props

  const classes = useStyles(props)

  return (
    <Container className={classes.root} {...restProps}>
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
  )
}

export default Footer
