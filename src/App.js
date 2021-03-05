import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/router";

import { Sidebar, Content } from "./components/layout";
import { List } from './pages';

function App() {
  return (
    <React.Fragment>
      <div data-scroll-lock-scrollable>
        <div className="layout">
          <Sidebar />
          <div className="content__wrapper">
            <Content>
              <Switch>
                <Route exact path="/">
                  <List />
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
      </div>
    </React.Fragment>
  );
}

export default hot(App);
