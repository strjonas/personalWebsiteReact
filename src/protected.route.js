import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import bcrypt from "bcryptjs";
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  let isauth;
  const session = localStorage.getItem("session");
  try {
    var hash = "$2b$10$4A0FP3u6FE4frp1JqNR7.e.Rz9sugbTKmHYySjhAzisX0JyNf0VlK";
    if (session !== null) {
      isauth = bcrypt.compareSync(session, hash);
    }
  } catch (err) {
    console.log(err);
  }
  localStorage.setItem("path", window.location.pathname);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isauth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
