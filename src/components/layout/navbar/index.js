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
    const path = location.pathname
      .split("/")
      .slice(0, 2)
      .join("/");

    if (pageTitle[path]) {
      setTitle(pageTitle[path]);
    } else {
      setTitle(false);
    }
  }, [location.pathname]);

  return (
    <React.Fragment>
      <div className="n__nav">
        {title && (
          <div className="n__nav__back" onClick={() => history.goBack()}>
            <IconBack style={{ width: 8, height: 14, marginRight: 10 }} />
            <div>{title}</div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};