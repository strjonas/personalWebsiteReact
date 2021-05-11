import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./index.scss";

import TasksHandler from "./components/TasksHandler";
import BookmarkHandler from "./components/BookmarkHandler";
import PhotoHandler from "./components/PhotoHandler";
import PastebinHandler from "./PastebinHandler";
import Navbar from "./components/Navbar2";

function Landing() {
  return <div>HELLO</div>;
}

function App() {
  return (
    <>
      <Router>
        <Navbar />
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
