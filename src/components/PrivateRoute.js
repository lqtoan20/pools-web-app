import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const loggedIn = useSelector((state) => !!state.authedUser);
  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];

  if (loggedIn) {
    return children;
  } else {
    return <Navigate to={`/login?redirectTo=${redirectUrl}`} />;
  }
};

export default PrivateRoute;
