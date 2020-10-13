import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function ButtonToInvoicesListing(props) {
  const history = useHistory();

  function handleClick() {
    history.push("/updateinvoice/" + props.invoiceId);
  }

  return (
    <Button variant="warning" onClick={handleClick} size="lg">
      Go back to invoices listing
    </Button>
  );
}
