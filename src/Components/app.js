import React from "react";
import LoadCreateInvoice from "./LoadCreateInvoice.js";
import LoadUpdateinvoice from "./LoadUpdateinvoice";
import LoadDisplayinvoice from "./LoadDisplayinvoices.js";
import LoadHomepage from "./LoadHomepage.js";
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
            <LoadHomepage />
          </Route>
          <Route path="/createinvoice">
            <LoadCreateInvoice />
          </Route>
          <Route path="/updateinvoice/:invoiceId">
            <LoadUpdateinvoice />
          </Route>
          <Route path="/displayinvoice/:invoiceId">
            <LoadDisplayinvoice />
          </Route>
          <Route path="/allinvoices">
            <LoadAllInvoices />
          </Route>
          <Route>
            <LoadPageNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
