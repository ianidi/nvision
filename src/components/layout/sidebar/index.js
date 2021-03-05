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
    </React.Fragment>
  );
}

function MenuHeader({ title }) {
  return (
    <React.Fragment>
      <div className="menuHeader">{title}</div>
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
          menuLink_active: isActive !== null
        })}
        onClick={memuClickHandler}
      >
        <div
          className={classNames({
            menuLink: true
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