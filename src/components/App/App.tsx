import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Theme,
  Typography,
  useMediaQuery,
  useTheme, CssBaseline, Divider,
} from '@material-ui/core'
import {
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons'
import React, {useEffect, useState, useMemo} from 'react'
import Footer from '../Footer/Footer'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import CountdownCreate from '../CountdownCreate/CountdownCreate'
import Countdown from '../Countdown/Countdown'
import AppNav from '../AppNav/AppNav'
import routePatterns from '../../routePatterns'
import {Menu as MenuIcon} from '@material-ui/icons'
import clsx from 'clsx'

const drawerWidth = 240

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  nav: {
    display: 'flex',
  },
  contentRoot: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  footer: {
    flexShrink: 0,
  },
}))

function App(props: {}) {
  const classes = useStyles(props)

  const [sMobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const closeDrawer = () => setMobileDrawerOpen(false)
  const openDrawer = () => setMobileDrawerOpen(true)

  const theme = useTheme()
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const drawerOpen = useMemo(() => (
    !isMobileScreen || sMobileDrawerOpen
  ), [isMobileScreen, sMobileDrawerOpen])

  useEffect(() => {
    document.title = 'Countdown'
  })

  const appNav = <AppNav LinkProps={{onClick: closeDrawer}}/>

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <CssBaseline/>
      <div className={classes.root}>
        <AppBar className={clsx(classes.appBar, {[classes.appBarShift]: drawerOpen})}>
          <Toolbar>
            <IconButton
              color='inherit'
              edge='start'
              onClick={openDrawer}
              className={clsx({[classes.hide]: drawerOpen})}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant='h6' noWrap>
              Countdown
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            }),
          }}
          open={drawerOpen}
          variant='permanent'
          anchor='left'
          onClose={openDrawer}
        >
          <div className={classes.toolbar}>
            <IconButton
              className={clsx({[classes.hide]: !isMobileScreen || !sMobileDrawerOpen})}
              onClick={closeDrawer}
            >
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          {appNav}
        </Drawer>
        <div className={classes.contentRoot}>
          <div className={classes.content}>
            <Switch>
              <Route path={routePatterns.newCountdown} exact strict>
                <CountdownCreate/>
              </Route>
              <Route path={routePatterns.countdown} exact strict>
                <Countdown/>
              </Route>
            </Switch>
          </div>
          <Footer className={classes.footer}/>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
