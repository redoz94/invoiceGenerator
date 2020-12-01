import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function ButtonToCreateInvoice(props) {
  const history = useHistory();

  function handleClick() {
    history.push("/createinvoice");
  }

  return (
    <Button variant="danger" size="lg" onClick={handleClick}>
      Create a NEW invoice
    </Button>
  );
}
