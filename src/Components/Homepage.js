import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import ButtonToCreateInvoice from "./ButtonToCreateInvoice";
import ButtonToListing from "./ButtonToListing.js";

export default class Homepage extends React.Component {
  render() {
    return (
      <Jumbotron
        style={{
          width: "80%",
          marginLeft: "10%",
          marginTop: "10%",
          height: "400px",
        }}
      >
        <h1>Welcome to The Invoice Generator!</h1>
        <p>Press one of the buttons below</p>
        <ButtonToCreateInvoice />
        {"  "}
        <ButtonToListing />
      </Jumbotron>
    );
  }
}
