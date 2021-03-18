import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/router";

import { Navbar, Sidebar, Content } from "./components/layout";
import { Cert } from './pages';
import { Profile } from './pages';
import { Employee } from './pages';
import { Guide } from './pages';

function App() {
  return (
    <React.Fragment>
      <div data-scroll-lock-scrollable>
        <div className="layout">
          <Navbar />
          <Sidebar />
          <Content>
            <Switch>
              <Route exact path="/cert/:pageNumber">
                <Cert />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/employee/:pageNumber">
                <Employee />
              </Route>
              <Route exact path="/guide">
                <Guide />
              </Route>
              <PrivateRoute path="/overview" component={Cert} />
            </Switch>
          </Content>
        </div>
      </div>
    </React.Fragment>
  );
}

export default hot(App);
