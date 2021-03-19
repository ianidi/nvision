import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/router";

import { close, selectOpen, selectTitle } from "./store/modalSlice";
import { Modal } from '@yandex/ui/Modal/desktop'

import { Navbar, Sidebar, Content } from "./components/layout";
import { Cert } from './pages';
import { Profile } from './pages';
import { Employee } from './pages';
import { Guide } from './pages';
import { ModalCert, ModalCredential, ModalDegree, ModalDiploma, ModalPD, ModalFilter } from './components/ui/modal';

function App() {
  const modalOpen = useSelector(selectOpen);
  const modalTitle = useSelector(selectTitle);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div data-scroll-lock-scrollable>
        <Modal theme="normal" onClose={() => dispatch(close())} visible={modalOpen} zindexgrouplevel={20}>
          {modalTitle === "cert" && <ModalCert />}
          {modalTitle === "diploma" && <ModalDiploma />}
          {modalTitle === "degree" && <ModalDegree />}
          {modalTitle === "credential" && <ModalCredential />}
          {modalTitle === "pd" && <ModalPD />}
          {modalTitle === "filter" && <ModalFilter />}
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
