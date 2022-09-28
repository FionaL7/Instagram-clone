import React from "react";
import { Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { UserAuth } from "../context/AuthContext";
import propTypes from "prop-types";

export default function ProtectedRoute({ children }) {
  const { user } = UserAuth() || {};
  if (!user) {
    return (
      <Navigate
        to={{ pathname: ROUTES.LOGIN }}
        state={{ from: window.location }}
      />
    );
  }
  return children;
}

ProtectedRoute.propTypes = {
  user: propTypes.object,
  children: propTypes.object.isRequired,
};
