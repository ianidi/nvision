import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../../store/uiSlice";
import { ReactComponent as IconDrawer } from '../../../assets/icons/drawer.svg';
import "./style.scss";

var classNames = require("classnames");

export const Navbar = ({ drawer }) => {
  return (
    <React.Fragment>
      <div className="navbar">
        <div
          className={classNames({
            logo: true,
            sidebar_drawer: drawer,
          })}
        >
          <IconDrawer style={{ width: 24, height: 18 }} />
        </div>
              <div className="bottom__container">
                <div className="menuLink__container">
                </div>

                <div className="signout">Sign out</div>
              </div>
        </div>
    </React.Fragment>
  );
}

function MenuLink({ icon, title, to, count }) {
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
          <div className="icon">{icon}</div>
          <div className="menu__title">
            {title}
          </div>
          {count && <div className="count">{count}</div>}
        </div>
      </div>
    </React.Fragment>
  );
}