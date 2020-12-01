import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function ButtonToListing(props) {
  const history = useHistory();

  function handleClick() {
    history.push("/allinvoices");
  }

  return (
    <Button variant="primary" size="lg" onClick={handleClick}>
      Show All Invoices
    </Button>
  );
}
