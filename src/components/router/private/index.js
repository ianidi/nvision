
import React from "react";
import Cookies from "js-cookie";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = (props) => {
  const token = Cookies.get("token") || false;

  if (token !== false) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};
