// React stuff
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import 'tachyons'
import './App.css'
import Nav from './components/layout/Nav'
import Chat from './components/chat/Chat'
import Register from './components/auth/NewRegister'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import InitialDashboard from './components/dashboard/InitialDashboard'
import GuestDashboard from './components/dashboard/GuestDashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import ProfileOverview from './components/profile-rest/ProfileOverview'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { SocketProvider } from './contexts/SocketContext';
import PageContent from './components/layout/Themes/PageContent'
import NotFound from './components/layout/NotFound'
import Forum from './components/ForumRoutes/Forum'
import AddPost from './components/ForumRoutes/AddPost'
import ForumPost from './components/ForumRoutes/ForumPost'
import ForumDiscussion from './components/ForumRoutes/ForumDiscussion'
import ForumEdit from './components/ForumRoutes/ForumEdit'
import SocialProfile from './components/SocialRoutes/SocialProfile'
import Social from './components/SocialRoutes/Social'
import CreateSocialProfile from './components/SocialRoutes/CreateSocialProfile'
import Settings from './components/settings/Settings';
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
      <SocketProvider>
        <ThemeProvider>
          <LanguageProvider>
            <PageContent>
              <Router>
                <Nav />
                <Alert />
                <Switch>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <PrivateRoute exact path='/' component={InitialDashboard} />
                  <PrivateRoute exact path="/settings" component={Settings} />
                  <PrivateRoute
                    exact
                    path='/profile-overview'
                    component={ProfileOverview}
                  />
                  <PrivateRoute exact path='/chat' component={Chat} />
                  <PrivateRoute exact path='/forum' component={Forum} />
                  <PrivateRoute exact path='/forum/forum-add-post' component={AddPost} />
                  <PrivateRoute exact path='/forum/forum-post/:id' component={ForumPost} />
                  <PrivateRoute exact path='/forum/forum-post/:id/discuss' component={ForumDiscussion} />
                  <PrivateRoute exact path='/forum/forum-post/:id/edit' component={ForumEdit} />
                  <PrivateRoute exact path='/social' component={Social} />
                  <PrivateRoute exact path='/social/social-profile' component={SocialProfile} />
                  <PrivateRoute exact path='/social/profile/:id' component={GuestDashboard} />
                  <PrivateRoute exact path='/social/create-social-profile' component={CreateSocialProfile} />
                  <Route component={NotFound} />
                </Switch>
              </Router>
            </PageContent>
          </LanguageProvider>
        </ThemeProvider>
      </SocketProvider>
    </Provider>
  )
}

export default App
