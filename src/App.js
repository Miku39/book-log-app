import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import BookDetail from "./BookDetail";
import Books from "./Books";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/books/:id" component={BookDetail} />
        <Route path="/books" component={Books} />
      </Switch>
    </Router>
  );
}

export default App;
