import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function ButtonUpdateInvoice(props) {
  const history = useHistory();

  function handleClick() {
    history.push("/updateinvoice/" + props.invoiceId);
  }

  return (
    <Button variant="primary" onClick={handleClick}>
      Update invoice
    </Button>
  );
}
