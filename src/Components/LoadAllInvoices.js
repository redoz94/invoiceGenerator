import React from "react";
import InvoicesListing from "./InvoicesListing.js";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

export default function LoadAllInvoices(props) {
  return (
    <Card bg="dark" text="white">
      <Card.Header as="h3" style={{ textAlign: "center" }}>
        Invoices Listing
      </Card.Header>
      <Card.Body>
        <InvoicesListing />
      </Card.Body>
    </Card>
  );
}
