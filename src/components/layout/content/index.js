import React from "react";
import "./style.scss"
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

      <style jsx>{`
        .content {
          width: 100%;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding-top: 80px;
          padding-bottom: 130px;
          padding-left: 50px;
          padding-right: 50px;
          min-height: 100vh;
        }
        .bg_dark {
          // background: #eff1f8;
          // background: #f8faff;
          background: #fcfdff;
        }
        .burger__wrapper {
          display: none;
        }
        @media screen and (max-width: 991px) {
          .content {
            padding-left: 20px;
            padding-right: 20px;
          }
          .burger__wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            align-self: flex-start;
            margin-top: 30px;
            margin-bottom: 40px;
          }
          .menu-button {
            padding: 0;
            width: 24px;
            height: 24px;
            cursor: pointer;
            background-color: transparent;
            border: none;
            outline: none;
          }
          .menu-button__icon {
            pointer-events: none;
          }
        }
      `}</style>
    </React.Fragment>
  );
}
