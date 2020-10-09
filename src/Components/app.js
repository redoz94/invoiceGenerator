import React from "react";
import LoadHomePage from "./LoadHomePage";
import LoadCreateInvoice from "./LoadCreateInvoice.js";
import LoadUpdateInvoice from "./LoadUpdateInvoice.js";
import LoadDisplayInvoice from "./LoadDisplayInvoice.js";
import LoadAllInvoices from "./LoadAllInvoices.js";
import LoadPageNotFound from "./LoadPageNotFound.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LoadHomePage />
          </Route>
          <Route path="/createinvoice">
            <LoadCreateInvoice />
          </Route>
          <Route path="/updateinvoice">
            <LoadUpdateInvoice />
          </Route>
          <Route path="/displayinvoice">
            <LoadDisplayInvoice />
          </Route>
          <Route path="/allinvoices">
            <LoadAllInvoices />
          </Route>
          <Route>
            <LoadPageNotFound />
          </Route>
        </Switch>
        <Route exact path="/">
          <LoadHomePage />
        </Route>
      </BrowserRouter>
    );
  }
}
