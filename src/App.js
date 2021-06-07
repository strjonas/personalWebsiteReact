import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import "./index.scss";
import React, { useState } from "react";
import auth from "./auth";
import TasksHandler from "./components/TasksHandler";
import BookmarkHandler from "./components/BookmarkHandler";
import PhotoHandler from "./components/PhotoHandler";
import PastebinHandler from "./PastebinHandler";
import Navbar from "./components/Navbar2";
import Loginpage from "./Loginpage";
import { ProtectedRoute } from "./protected.route";
import bcrypt from "bcryptjs";

function App() {
  const [show, setShow] = useState(false);
  const [isauth, setisauth] = useState(false);
  let loc;
  let redir = false;
  try {
    loc = localStorage.getItem("path");
    if (loc !== undefined && loc !== null && loc !== "") {
      localStorage.removeItem("path");
      redir = true;
    }
  } catch (error) {}

  let opacity = 0;

  function setOpacity() {
    let verdunkler = document.getElementById("verdunklerMain");
    try {
      verdunkler.style.opacity = `${opacity}%`;
    } catch (error) {}
    opacity += 5;
  }

  function showrest() {
    opacity = 0;

    const interval = setInterval(setOpacity, 15);
    setTimeout(() => {
      clearInterval(interval);
    }, 250);
  }

  function showPopup() {
    if (show) {
      let verdunkler = document.getElementById("verdunklerMain");
      try {
        verdunkler.style.opacity = `${0}%`;
      } catch (error) {}
    } else {
      setTimeout(showrest, 50);
    }
    setShow(!show);
  }
  const session = localStorage.getItem("session");
  try {
    var hash = "$2a$10$LcRPoM/3q4eHnqYjQqLuN.9fO.oY8p1scDoLdH0oGbNOp4eWd8lWK";
    let temp;
    if (session !== null) {
      temp = bcrypt.compareSync(session, hash);
    }

    if (isauth !== temp) {
      setisauth(temp);
    }
  } catch (err) {
    console.log(err);
  }
  return (
    <>
      <Router>
        {redir && <Redirect to={`${loc}`} />}
        <Route
          render={(props) => (
            <div>
              {isauth && (
                <Navbar
                  auth={auth}
                  setisauth={setisauth}
                  props={props}
                  show={showPopup}
                />
              )}
            </div>
          )}
        />
        {show && window.innerWidth >= 460 && (
          <div
            id="verdunklerMain"
            style={{ width: window.innerWidth - 250 }}
            className="verdunklerMain"
          ></div>
        )}

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Loginpage auth={auth} setisauth={setisauth} props={props} />
            )}
          />
          <ProtectedRoute path="/pastebin" component={PastebinHandler} />
          <ProtectedRoute path="/tasks" component={TasksHandler} />
          <ProtectedRoute path="/photo" component={PhotoHandler} />
          <ProtectedRoute path="/bookmarks" component={BookmarkHandler} />
          <Route
            path="*"
            component={() => {
              return "404 page not found";
            }}
          />
        </Switch>
      </Router>
    </>
  );
}
export default App;
