import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../../store/uiSlice";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
// import Icon from "../icon";
import "./style.scss";

var classNames = require("classnames");

export const Sidebar = ({ drawer }) => {

  let menu = [
      {
        title: "Main",
        links: [
          {
            // icon: <Icon.Dashboard style={{ width: 15, height: 15 }} />,
            title: "Overview",
            to: `/overview`,
          },
        ],
      },
    ];

  return (
    <React.Fragment>
      <div
        className={classNames({
          sidebar__container: true,
          sidebar: true,
          sidebar_drawer: drawer,
        })}
      >
        <div
          className={classNames({
            logo: true,
            sidebar_drawer: drawer,
          })}
        />
        <div>
          <OverlayScrollbarsComponent
            options={{
              scrollbars: { autoHide: "never" },
            }}
            style={{ maxHeight: "90vh" }}
            className="os-theme-thin-dark"
          >
            {menu.map((header, index) => (
              <div
                key={index}
                className="menu__container"
              >
                <MenuHeader {...header} />
                {header.links.map((link, index_2) => (
                  <MenuLink key={index_2} {...link} />
                ))}
              </div>
            ))}

              <div className="bottom__container">
                <div className="menuLink__container">
                </div>

                <div className="signout">Sign out</div>
              </div>
          </OverlayScrollbarsComponent>
        </div>
      </div>

      <style jsx>{`
        .sidebar__container {
          background: #fff;
          height: 100%;
          // box-shadow: 10px 10px 20px #f2f2f7;
          box-shadow: 10px 10px 20px #f6f8fc;
          display: flex;
          flex-direction: column;
          // justify-content: center;
          padding-left: 16px;
          padding-right: 16px;
        }
        .logo {
          display: flex;
          padding-top: 20px;
          padding-bottom: 20px;
          padding-right: 20px;
          cursor: pointer;
          margin: 0 auto;
        }
        .menu__container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 140px;
        }
        .bottom__container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-top: 30px;
        }
        .signout {
          margin-top: 20px;
          margin-bottom: 50px;
          margin-left: 44px;
          color: #737373;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          user-select: none;
        }
        .flag__container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 1px;
          width: 21px;
          height: 15px;
          margin-right: 24px;
          cursor: pointer;
        }
        @media screen and (max-width: 1480px) {
          .sidebar__container {
            padding-left: 0;
            padding-right: 0;
          }
          .menu__container {
            display: block;
          }
          .bottom__container {
            align-items: center;
          }
          .flag__container {
            margin-right: 0;
            margin-bottom: 12px;
          }
          .signout {
            margin-left: 0;
          }
          .logo {
            padding-right: 0;
          }
        }
        @media screen and (max-width: 991px) {
          .sidebar__container {
            display: none;
          }
          .logo.sidebar_drawer {
            display: none;
          }
          .sidebar__container.sidebar_drawer {
            display: flex;
          }
        }
      `}</style>
    </React.Fragment>
  );
}

function MenuHeader({ title }) {
  return (
    <React.Fragment>
      <div className="menuHeader">{title}</div>
      <style jsx>{`
        .menuHeader {
          margin-top: 50px;
          margin-left: 44px;
          color: #b6bfc6;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          user-select: none;
        }
        @media screen and (max-width: 1480px) {
          .menuHeader {
            display: none;
          }
        }
      `}</style>
    </React.Fragment>
  );
}

function MenuLink({ /*icon,*/ title, to, count }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const isActive = useRouteMatch({
    path: to,
    exact: true,
    strict: false,
  });

  const memuClickHandler = () => {
    dispatch(closeDrawer());

    history.push(to);
  };

  return (
    <React.Fragment>
      <div
        className={classNames({
          menuLink__container: true,
          menuLink_active: isActive !== null,
          sidebar: true
        })}
        onClick={memuClickHandler}
      >
        <div
          className={classNames({
            menuLink: true,
            sidebar: true
          })}
        >
          {/*<div className="icon">{icon}</div>*/}
          <div className="menu__title">
            {title}
          </div>
          {count && <div className="count">{count}</div>}
        </div>
      </div>
    </React.Fragment>
  );
}