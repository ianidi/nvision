import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../../store/uiSlice";
import { ReactComponent as IconBack } from '../../../assets/icons/back.svg';
import "./style.scss";

var classNames = require("classnames");

export const Navbar = ({ drawer }) => {
  return (
    <React.Fragment>
      <div className="nav">
        <div className="nav__back">
          <IconBack style={{ width: 8, height: 14, marginRight: 10 }} />
          База сертификатов
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