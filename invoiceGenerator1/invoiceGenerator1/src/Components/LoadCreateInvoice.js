import React from "react";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Layout from "./Layout";

export default function LoadCreateInvoice(props) {
  return (
    <Jumbotron>
      <Card>
        <Card.Header as="h1">Create Invoice Form</Card.Header>
        <Card.Body>
          <Layout />
        </Card.Body>
      </Card>
    </Jumbotron>
  );
}
