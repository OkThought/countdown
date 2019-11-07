import React, {useMemo} from 'react'
import {Toolbar, Typography, AppBar, makeStyles, Theme, Button} from '@material-ui/core'
import {countdownPath, MINUTE} from '../../utils'
import {AppBarProps} from '@material-ui/core/AppBar'
import {Link} from 'react-router-dom'

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {},
  link: {
    color: 'inherit',
    margin: theme.spacing(0.5),
  },
}))

type NavItem = {
  label: string
  getUrl: () => string
}

export interface NavBarProps extends AppBarProps {
  
}

function NavBar(props: NavBarProps) {
  const {
    ...restProps
  } = props

  const links = useMemo<NavItem[]>(() => [{
    label: 'New',
    getUrl: () => '/new',
  }, {
    label: 'New Year',
    getUrl: () => countdownPath({
      to: new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0, 0),
      title: 'New Year 🎄',
    }),
  }, {
    label: 'Midnight',
    getUrl: () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return countdownPath({
        to: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0, 0),
        title: 'Midnight 🌃',
      })
    },
  }, {
    label: '5 minutes',
    getUrl: () => countdownPath({
      from: 5 * MINUTE,
      title: '5 minutes',
    }),
  }], [])

  const classes = useStyles(props)
  
  return (
    <AppBar className={classes.appBar} {...restProps}>
      <Toolbar>
        {links.map(({label, getUrl}) =>
          <Typography variant='h6' color='initial' key={label}>
            <Button
              className={classes.link}
              component={Link}
              to={getUrl}
            >
              {label}
            </Button>
          </Typography>,
        )}
      </Toolbar>
    </AppBar>
  )
}

NavBar.defaultProps = {
  position: 'sticky',
} as Partial<NavBarProps>

export default NavBar
