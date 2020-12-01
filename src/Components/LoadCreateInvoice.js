import React from "react";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Layout from "./Layout.js";

export default function LoadCreateInvoice(props) {
  return (
    <Jumbotron>
      <Card bg="dark" text="white">
        <Card.Header>
          <h1>Create Invoice</h1>
        </Card.Header>
        <Card.Body style={{ color: "black" }}>
          <Layout />
        </Card.Body>
      </Card>
    </Jumbotron>
  );
}
