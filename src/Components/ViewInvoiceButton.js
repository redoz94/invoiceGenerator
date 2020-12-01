import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function ViewInvoiceButton(props) {
  const history = useHistory();

  function handleClick() {
    history.push("/displayinvoice/" + props.invoiceId);

    console.log("You want to see the invoice, with the ID: " + props.invoiceId);
  }

  return (
    <Button variant="warning" onClick={handleClick}>
      View Invoice
    </Button>
  );
}
