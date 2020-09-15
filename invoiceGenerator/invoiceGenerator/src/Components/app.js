import React from "react";
import LoadHomepage from "./LoadHomepage";
import LoadCreateInvoice from "./LoadCreateInvoice";
import LoadUpdateInvoice from "./LoadUpdateInvoice";
import LoadAllInvoices from "./LoadAllInvoices";
import LoadDisplayInvoice from "./LoadDisplayInvoice";
import LoadPageNotFound from "./LoadPageNotfound";
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
      </BrowserRouter>
    );
  }
}
