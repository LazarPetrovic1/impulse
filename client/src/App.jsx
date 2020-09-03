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
import InitialDashboard from './components/dashboard/InitialDashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import ProfileOverview from './components/profile-rest/ProfileOverview'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import PageContent from './components/layout/PageContent'
import NotFound from './components/layout/NotFound'
import Forum from './components/ForumRoutes/Forum'
import AddPost from './components/ForumRoutes/AddPost'
import ForumPost from './components/ForumRoutes/ForumPost'
import ForumDiscussion from './components/ForumRoutes/ForumDiscussion'
import ForumEdit from './components/ForumRoutes/ForumEdit'
import SocialProfile from './components/SocialRoutes/SocialProfile'
import CreateSocialProfile from './components/SocialRoutes/CreateSocialProfile'
import Developer from './components/misc/Developer'
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
            <>
              <Nav />
              <Alert />
              <Switch>
                <PrivateRoute exact path='/' component={InitialDashboard} />
                <PrivateRoute exact path='/developer' component={Developer} />
                <Route
                  exact
                  path='/login'
                  render={() => (
                    <PageContent>
                      <Login />
                    </PageContent>
                  )}
                />
                <Route
                  exact
                  path='/register'
                  render={() => (
                    <PageContent>
                      <Register />
                    </PageContent>
                  )}
                />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute
                  exact
                  path='/profile-overview'
                  component={ProfileOverview}
                />
                <PrivateRoute exact path='/forum' component={Forum} />
                <PrivateRoute
                  exact
                  path='/forum/forum-add-post'
                  component={AddPost}
                />
                <PrivateRoute
                  exact
                  path='/forum/forum-post/:id'
                  component={ForumPost}
                />
                <PrivateRoute
                  exact
                  path='/forum/forum-post/:id/discuss'
                  component={ForumDiscussion}
                />
                <PrivateRoute
                  exact
                  path='/forum/forum-post/:id/edit'
                  component={ForumEdit}
                />
                <PrivateRoute
                  exact
                  path='/social/social-profile'
                  component={SocialProfile}
                />
                <PrivateRoute
                  exact
                  path='/social/create-social-profile'
                  component={CreateSocialProfile}
                />
                <Route
                  render={() => (
                    <PageContent>
                      <NotFound />
                    </PageContent>
                  )}
                />
              </Switch>
            </>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
