import React from "react";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Layout from "./Layout";

export default function LoadCreateInvoice(props) {
  return (
    <Jumbotron>
      <Card bg="dark" text="white">
        <Card.Header as="h4">Create Invoice Form</Card.Header>
        <Card.Body style={{ color: "black" }}>
          <Layout />
        </Card.Body>
      </Card>
    </Jumbotron>
  );
}
