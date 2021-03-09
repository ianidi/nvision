import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/router";

import { Navbar, Sidebar, Content } from "./components/layout";
import { List } from './pages';
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
              <Route exact path="/">
                <List />
              </Route>
              <Route exact path="/guide">
                <Guide />
              </Route>
              <Route exact path="/verify/:Action/:Method/:Hash/:Code">
                <List />
              </Route>
              <Route path="/signup" component={List} />
              <PrivateRoute path="/overview" component={List} />
            </Switch>
          </Content>
        </div>
      </div>
    </React.Fragment>
  );
}

export default hot(App);
