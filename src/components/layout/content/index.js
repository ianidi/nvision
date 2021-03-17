import React from "react";
import "./style.scoped.scss"
// import { useRouteMatch } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { toggleDrawer, closeDrawer, selectDrawerOpen } from "../../store/uiSlice";
// import { Drawer, SIZE, ANCHOR } from "baseui/drawer";
// import Sidebar from "./sidebar";

var classNames = require("classnames");

export const Content = ({ children }) => {
  // const dispatch = useDispatch();
  // const drawerOpen = useSelector(selectDrawerOpen);

  // const bgDark = useRouteMatch(["/offer", "/overview", "/wallet", "/deal"]); //, "/profile"
  // const isManager = useRouteMatch(["/manager"]);

  return (
    <React.Fragment>
    <div className="content__wrapper">
        <div className="content">
            <div
              className="burger__wrapper"
              onClick={() => {
                // dispatch(toggleDrawer());
              }}
            >
              <button className="menu-button">
                <svg fill="#aeb0b3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="menu-button__icon">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 7a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h18a1 1 0 010 2H3a1 1 0 01-1-1zm1 4a1 1 0 000 2h18a1 1 0 000-2H3z"
                  ></path>
                </svg>
              </button>
            </div>
            {/*<Drawer isOpen={drawerOpen} autoFocus onClose={() => dispatch(closeDrawer())} size={SIZE.auto} anchor={ANCHOR.left}>
              <Sidebar drawer />
            </Drawer>*/}
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}
