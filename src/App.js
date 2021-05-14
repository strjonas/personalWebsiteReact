import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./index.scss";
import React, { useState } from "react";

import TasksHandler from "./components/TasksHandler";
import BookmarkHandler from "./components/BookmarkHandler";
import PhotoHandler from "./components/PhotoHandler";
import PastebinHandler from "./PastebinHandler";
import Navbar from "./components/Navbar2";

function App() {
  const [show, setShow] = useState(false);
  function showPopup() {
    setShow(!show);
  }

  return (
    <>
      <Router>
        <Navbar show={showPopup} />
        {show && (
          <div
            style={{ width: window.innerWidth - 250 }}
            className="verdunklerMain"
          ></div>
        )}
        <Switch>
          <Route path="/" exact component={TasksHandler} />
          <Route path="/pastebin" component={PastebinHandler} />
          <Route path="/tasks" component={TasksHandler} />
          <Route path="/photo" component={PhotoHandler} />
          <Route path="/bookmarks" component={BookmarkHandler} />
        </Switch>
      </Router>
    </>
  );
}
export default App;
