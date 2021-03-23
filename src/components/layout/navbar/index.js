import React, { useState, useLayoutEffect } from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../../store/uiSlice";
import { pageTitle } from "../../../config";
import { ReactComponent as IconBack } from "../../../assets/icons/back.svg";
import "./style.scoped.scss";

var classNames = require("classnames");

export const Navbar = ({ drawer }) => {
  const location = useLocation();
  const history = useHistory();

  const [title, setTitle] = useState(false);

  useLayoutEffect(() => {
    if (pageTitle[location.pathname]) {
      setTitle(pageTitle[location.pathname]);
    } else {
      setTitle(false);
    }
  }, [location.pathname]);

  return (
    <React.Fragment>
      <div className="nav">
        {title && (
          <div className="nav__back">
            <div onClick={() => history.goBack()}>
              <IconBack style={{ width: 8, height: 14, marginRight: 10 }} />
            </div>
            <div>{title}</div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

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
          menuLink_active: isActive !== null,
        })}
        onClick={memuClickHandler}
      >
        <div
          className={classNames({
            menuLink: true,
          })}
        >
          <div className="icon">{icon}</div>
          <div className="menu__title">{title}</div>
          {count && <div className="count">{count}</div>}
        </div>
      </div>
    </React.Fragment>
  );
}
