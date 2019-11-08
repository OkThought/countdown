import React, {useMemo, Key, useState} from 'react'
import {
  Toolbar,
  AppBar,
  makeStyles,
  Theme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Hidden,
  Drawer,
  Typography,
} from '@material-ui/core'
import {Add as AddIcon, Menu as MenuIcon} from '@material-ui/icons'
import {countdownPath, MINUTE} from '../../utils'
import {AppBarProps} from '@material-ui/core/AppBar'
import {Link} from 'react-router-dom'
import routePatterns from '../../routePatterns'
import {ListItemIconProps} from '@material-ui/core/ListItemIcon'

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {},
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    color: 'inherit',
    margin: theme.spacing(0.5),
  },
}))

type NavItem = {
  key?: Key
  label: string
  icon: ListItemIconProps['children']
  getUrl: () => string
}

export interface NavBarProps extends AppBarProps {

}

function NavBar(props: NavBarProps) {
  const {
    ...restProps
  } = props

  const [drawerOpen, drawerOpenSet] = useState(false)

  const handleDrawerToggle = () => {
    drawerOpenSet(!drawerOpen)
  }

  const items = useMemo<NavItem[]>(() => [{
    label: 'New',
    icon: <AddIcon/>,
    getUrl: () => routePatterns.newCountdown,
  }, {
    label: 'New Year',
    icon: <span role='img' aria-label='new year'>🎄</span>,
    getUrl: () => countdownPath({
      to: new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0, 0),
      title: 'New Year 🎄',
    }),
  }, {
    label: 'Midnight',
    icon: <span role='img' aria-label='midnight'>🌙</span>,
    getUrl: () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return countdownPath({
        to: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0, 0),
        title: 'Midnight 🌙',
      })
    },
  }, {
    label: '5 minutes',
    icon: <span role='img' aria-label='5 minutes'>5️⃣</span>,
    getUrl: () => countdownPath({
      from: 5 * MINUTE,
      title: '5 minutes',
    }),
  }], [])

  const classes = useStyles(props)

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Typography variant='h6'>
          Countdown
        </Typography>
      </div>
      <Divider/>
      <List>
        {items.map(({label, key = label, icon, getUrl}) =>
          <ListItem button key={key} component={Link} to={getUrl}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText>
              {label}
            </ListItemText>
          </ListItem>,
        )}
      </List>
    </div>
  )

  return (
    <>
      <AppBar className={classes.appBar} {...restProps}>
        <Toolbar>
          <IconButton
            color='inherit'
            edge='start'
            onClick={handleDrawerToggle}
          >
            <MenuIcon/>
          </IconButton>
        </Toolbar>
        <nav>
          <Hidden smUp implementation='css'>
            <Drawer
              open={drawerOpen}
              variant='temporary'
              anchor='left'
              onClose={handleDrawerToggle}
              ModalProps={{keepMounted: true}}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer open variant='permanent'>
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </AppBar>
    </>
  )
}

NavBar.defaultProps = {
  position: 'sticky',
} as Partial<NavBarProps>

export default NavBar
