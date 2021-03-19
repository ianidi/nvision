import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/router";

import { close, selectOpen, selectTitle } from "./store/modalSlice";
import { compose } from '@bem-react/core'
import {
  Modal as ModalDesktop,
  withThemeNormal,
} from '@yandex/ui/Modal/desktop'
import { withZIndex } from '@yandex/ui/withZIndex'

import { Navbar, Sidebar, Content } from "./components/layout";
import { Cert } from './pages';
import { Profile } from './pages';
import { Employee } from './pages';
import { Guide } from './pages';
import { ModalCert, ModalCredential, ModalDegree, ModalDiploma, ModalPD } from './components/ui/modal';

var classNames = require("classnames");

const Modal = compose(
  withThemeNormal,
  withZIndex,
)(ModalDesktop);

function App() {
  const modalOpen = useSelector(selectOpen);
  const modalTitle = useSelector(selectTitle);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div data-scroll-lock-scrollable>

      <Modal theme="normal" onClose={() => dispatch(close())} visible={modalOpen} zindexgrouplevel={2000}>
        {modalTitle === "cert" && <ModalCert />}
        {modalTitle === "diploma" && <ModalDiploma />}
        {modalTitle === "degree" && <ModalDegree />}
        {modalTitle === "credential" && <ModalCredential />}
        {modalTitle === "pd" && <ModalPD />}
      </Modal>

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
