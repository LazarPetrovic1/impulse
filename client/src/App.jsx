// React stuff
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import 'tachyons'
import "./App.css";
import Nav from "./components/layout/Nav";
import Chat from "./components/chat/Chat";
import Register from "./components/auth/NewRegister";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import InitialDashboard from "./components/dashboard/InitialDashboard";
import HomePage from "./components/dashboard/HomePage";
import GuestDashboard from "./components/dashboard/GuestDashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FontProvider } from "./contexts/FontContext";
import { DevProvider } from "./contexts/DevContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SocketProvider } from "./contexts/SocketContext";
import { ColourProvider } from "./contexts/ColourContext";
import PageContent from "./components/layout/Themes/PageContent";
import NotFound from "./components/layout/NotFound";
import Upgrade from "./components/layout/Upgrade";
import Forum from "./components/ForumRoutes/Forum";
import AddPost from "./components/ForumRoutes/AddPost";
import ForumPost from "./components/ForumRoutes/ForumPost";
import ForumDiscussion from "./components/ForumRoutes/ForumDiscussion";
import ForumEdit from "./components/ForumRoutes/ForumEdit";
import SocialProfile from "./components/SocialRoutes/SocialProfile";
import Social from "./components/SocialRoutes/Social";
import CreateSocialProfile from "./components/SocialRoutes/CreateSocialProfile";
import Settings from "./components/settings/Settings";
import UploadVideo from "./components/VideoRoutes/UploadVideo";
import Video from "./components/VideoRoutes/Video";
import VideoAll from "./components/VideoRoutes/VideoNav/VideoAll";
import VideoPerson from "./components/VideoRoutes/VideoNav/VideoPerson";
import Group from "./components/group/Group";
import GroupPostPage from "./components/group/GroupPostPage";
import ImagePostPage from "./components/media/ImagePostPage";
import TextPostPage from "./components/media/TextPostPage";
import NotifPage from "./components/notifs/NotifPage";
// Redux stuff
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { findNotifs } from "./actions/notifs";
import setAuthToken from "./utils/setAuthToken";
import notifSound from "./assets/sound-effects/notifs/thunder.mp3";
import ChangePassword from "./components/misc/ChangePassword";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        store.getState().auth &&
        store.getState().auth.user &&
        store.getState().auth.user._id
      ) {
        store.dispatch(findNotifs(store.getState().auth.user._id));
        if (store.getState().notifs.notifs.some((not) => !not.read)) {
          let audio = new Audio(notifSound);
          audio.play();
        }
      }
    }, 5 * 60 * 1000);

    if (
      store.getState().auth &&
      store.getState().auth.user &&
      store.getState().auth.user._id
    ) {
      store.dispatch(findNotifs(store.getState().auth.user._id));
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <Provider store={store}>
      <ColourProvider>
        <DevProvider>
          <FontProvider>
            <SocketProvider>
              <ThemeProvider>
                <LanguageProvider>
                  <PageContent>
                    <Router>
                      <Nav />
                      <Alert />
                      <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route
                          exact
                          path="/impulse/change-password"
                          component={ChangePassword}
                        />
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute
                          exact
                          path="/dashboard"
                          component={InitialDashboard}
                        />
                        <PrivateRoute
                          exact
                          path="/settings"
                          component={Settings}
                        />
                        <PrivateRoute exact path="/chat" component={Chat} />
                        <PrivateRoute exact path="/forum" component={Forum} />
                        <PrivateRoute
                          exact
                          path="/forum/forum-add-post"
                          component={AddPost}
                        />
                        <PrivateRoute
                          exact
                          path="/forum/forum-post/:id"
                          component={ForumPost}
                        />
                        <PrivateRoute
                          exact
                          path="/forum/forum-post/:id/discuss"
                          component={ForumDiscussion}
                        />
                        <PrivateRoute
                          exact
                          path="/forum/forum-post/:id/edit"
                          component={ForumEdit}
                        />
                        <PrivateRoute exact path="/social" component={Social} />
                        <PrivateRoute
                          exact
                          path="/social/social-profile"
                          component={SocialProfile}
                        />
                        <PrivateRoute
                          exact
                          path="/social/profile/:id"
                          component={GuestDashboard}
                        />
                        <PrivateRoute
                          exact
                          path="/social/create-social-profile"
                          component={CreateSocialProfile}
                        />
                        <PrivateRoute
                          exact
                          path="/upgrade"
                          component={Upgrade}
                        />
                        <PrivateRoute
                          exact
                          path="/videos-all"
                          component={VideoAll}
                        />
                        <PrivateRoute
                          exact
                          path="/videos-mine"
                          component={VideoPerson}
                        />
                        <PrivateRoute
                          exact
                          path="/video/upload"
                          component={UploadVideo}
                        />
                        <PrivateRoute
                          exact
                          path="/videos/:id"
                          component={Video}
                        />
                        <PrivateRoute
                          exact
                          path="/groups/:id"
                          component={Group}
                        />
                        <PrivateRoute
                          exact
                          path="/groups/:id/:post_id"
                          component={GroupPostPage}
                        />
                        <PrivateRoute
                          exact
                          path="/images/:id"
                          component={ImagePostPage}
                        />
                        <PrivateRoute
                          exact
                          path="/status/:id"
                          component={TextPostPage}
                        />
                        <PrivateRoute
                          exact
                          path="/notifs"
                          component={NotifPage}
                        />
                        <Route component={NotFound} />
                        {/*
                          <Route component={VideoNotif} path="/videos/:id" />
                          <Route component={ImageNotif} path="/images/:id" />
                          <Route component={ForumNotif} path="/forum/forum-post/:id" />
                          <Route component={FriendRequestNotif} path="/social/profile/:id" />
                          <Route component={FriendRequestNotif} path="/textpost/:id" />
                        */}
                      </Switch>
                    </Router>
                  </PageContent>
                </LanguageProvider>
              </ThemeProvider>
            </SocketProvider>
          </FontProvider>
        </DevProvider>
      </ColourProvider>
    </Provider>
  );
}

export default App;
