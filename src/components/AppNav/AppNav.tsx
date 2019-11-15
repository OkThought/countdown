import React, {useMemo, Key, HTMLProps} from 'react'
import {makeStyles, Theme, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import {Add as AddIcon} from '@material-ui/icons'
import {countdownPath, MINUTE} from '../../utils'
import {Link, LinkProps} from 'react-router-dom'
import routePatterns from '../../routePatterns'
import {ListItemIconProps} from '@material-ui/core/ListItemIcon'

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
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

export interface AppNavProps extends HTMLProps<HTMLDivElement> {
  LinkProps?: Partial<LinkProps>
}

function AppNav(props: AppNavProps) {
  const {
    LinkProps: linkProps = {},
    ...restProps
  } = props

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

  return (
    <div className={classes.root} {...restProps}>
      <div className={classes.toolbar}/>
      <Divider/>
      <List>
        {items.map(({label, key = label, icon, getUrl}) =>
          <ListItem button key={key} component={Link} to={getUrl} {...linkProps}>
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
}

AppNav.defaultProps = {
  position: 'sticky',
} as Partial<AppNavProps>

export default AppNav
