import {makeStyles} from '@material-ui/core'
import React from 'react'
import Footer from '../Footer/Footer'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import CountdownCreate from '../CountdownCreate/CountdownCreate'
import Countdown from '../Countdown/Countdown'
import NavBar from '../NavBar/NavBar'

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

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <NavBar/>
        <div className={classes.content}>
          <Switch>
            <Route path='/new' exact strict>
              <CountdownCreate/>
            </Route>
            <Route path='/' exact strict>
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
