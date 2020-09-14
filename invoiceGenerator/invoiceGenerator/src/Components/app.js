import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function LoadHomePage(props) {
  return <h1>Welcome to the homepage!!!</h1>;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/">
          <LoadHomePage />
        </Route>
      </BrowserRouter>
    );
  }
}
