import React, {useMemo} from 'react'
import {Toolbar, Typography, Button, AppBar, makeStyles, Theme} from '@material-ui/core'
import {countdownUrl, MINUTE} from '../../utils'
import {AppBarProps} from '@material-ui/core/AppBar'
import {useHistory} from 'react-router-dom'

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {},
  link: {
    color: 'inherit',
    margin: theme.spacing(0.5),
  },
}))

type Link = { 
  label: string
  getUrl: () => string
}

export interface NavBarProps extends AppBarProps {
  
}

function NavBar(props: NavBarProps) {
  const {
    ...restProps
  } = props

  const history = useHistory()
  
  const links = useMemo<Link[]>(() => [{
    label: 'New',
    getUrl: () => '/new',
  }, {
    label: 'New Year',
    getUrl: () => countdownUrl({
      to: new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0, 0),
      title: 'New Year 🎄',
    }),
  }, {
    label: 'Midnight',
    getUrl: () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return countdownUrl({
        to: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0, 0),
        title: 'Midnight 🌃',
      })
    },
  }, {
    label: '5 minutes',
    getUrl: () => countdownUrl({
      to: new Date(new Date().getTime() + 5 * MINUTE),
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
              onClick={() => history.push(getUrl())}
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
