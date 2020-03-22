// React stuff
import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'tachyons'
import './App.css'
import Nav from './components/layout/Nav'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import ProfileOverview from './components/profile-rest/ProfileOverview'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import PageContent from './components/layout/PageContent'
import NotFound from './components/layout/NotFound'
import ForumRoutes from './components/routing/ForumRoutes'

// Redux stuff
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App () {
  useEffect(() => {
    store.dispatch(loadUser())
    // eslint-disable-next-line
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <Fragment>
              <Nav />
              <Alert />
              <Switch>
                <Route exact path='/login' render={() => <PageContent><Login /></PageContent>} />
                <Route exact path='/register' render={() => <PageContent><Register /></PageContent>} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute
                  exact
                  path='/profile-overview'
                  component={ProfileOverview}
                />
                <Route render={() => <PageContent><ForumRoutes /></PageContent>} />
                <Route render={() => <PageContent><NotFound /></PageContent>} />
              </Switch>
            </Fragment>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
