import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

function App() {
  const [show, setShow] = useState(false);
  const [isauth, setauth] = useState(false);
  function showPopup() {
    setShow(!show);
  }
  return (
    <>
      <Router>
        {auth.authenticated && <Navbar show={showPopup} />}
        {show && (
          <div
            style={{ width: window.innerWidth - 250 }}
            className="verdunklerMain"
          ></div>
        )}

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Loginpage auth={auth} setauth={setauth} props={props} />
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
