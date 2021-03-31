import React from "react";
import "./style.scoped.scss";

var classNames = require("classnames");

export const Button = ({ title, icon, style, onClick, loading = false }) => {
  return (
    <React.Fragment>
      <div className={classNames({ button: true, button_loading: loading })} style={{ ...style }} onClick={onClick}>
        {title}
      </div>

      <style jsx>{``}</style>
    </React.Fragment>
  );
};
