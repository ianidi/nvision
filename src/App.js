import React from "react";
import { hot } from "react-hot-loader/root";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/router";

import { close, selectOpen, selectTitle } from "./store/modalSlice";
import { Modal } from "@yandex/ui/Modal/desktop";

import { Navbar, Sidebar, Content } from "./components/layout";
import { Cert, Profile, Employee, Guide, GuideView, Report } from "./pages";
import {
  ModalCert,
  ModalCertRemove,
  ModalDiploma,
  ModalDiplomaRemove,
  ModalDegree,
  ModalDegreeRemove,
  ModalCredential,
  ModalCredentialRemove,
  ModalPD,
  ModalGuideCreate,
  ModalGuideEdit,
  ModalGuideRemove,
} from "./components/ui/modal";

function App() {
  const modalOpen = useSelector(selectOpen);
  const modalTitle = useSelector(selectTitle);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div data-scroll-lock-scrollable>
        <Modal theme="normal" onClose={() => dispatch(close())} visible={modalOpen} zindexgrouplevel={20}>
          {modalTitle === "cert" && <ModalCert />}
          {modalTitle === "cert/remove" && <ModalCertRemove />}
          {modalTitle === "diploma" && <ModalDiploma />}
          {modalTitle === "diploma/remove" && <ModalDiplomaRemove />}
          {modalTitle === "degree" && <ModalDegree />}
          {modalTitle === "degree/remove" && <ModalDegreeRemove />}
          {modalTitle === "credential" && <ModalCredential />}
          {modalTitle === "credential/remove" && <ModalCredentialRemove />}
          {modalTitle === "pd" && <ModalPD />}
          {modalTitle === "guide/create" && <ModalGuideCreate />}
          {modalTitle === "guide/edit" && <ModalGuideEdit />}
          {modalTitle === "guide/remove" && <ModalGuideRemove />}
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
              <Route path="/guide/:category">
                <GuideView />
              </Route>
              <Route exact path="/report">
                <Report />
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
