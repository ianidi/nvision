import React from "react";
import "./style.scoped.scss";

var classNames = require("classnames");

export const Button = ({ title, icon, style, onClick, loading = false }) => {
  return (
    <React.Fragment>
      <div
        className={classNames({ button__button: true, button__button_loading: loading })}
        style={{ ...style }}
        onClick={loading === false ? onClick : undefined}
      >
        {title}
      </div>
    </React.Fragment>
  );
};
