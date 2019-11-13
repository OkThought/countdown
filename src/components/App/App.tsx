import {makeStyles} from '@material-ui/core'
import React, {useEffect} from 'react'
import Footer from '../Footer/Footer'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import CountdownCreate from '../CountdownCreate/CountdownCreate'
import Countdown from '../Countdown/Countdown'
import NavBar from '../NavBar/NavBar'
import routePatterns from '../../routePatterns'

//noinspection TypeScriptValidateTypes
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
})

function App(props: {}) {
  const classes = useStyles(props)

  useEffect(() => {
    document.title = 'Countdown'
  })

  return (
    <div className={classes.root}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <NavBar/>
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
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App
