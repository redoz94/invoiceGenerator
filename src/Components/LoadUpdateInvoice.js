import React from "react";
import { useParams } from "react-router-dom";

export default function LoadUpdateInvoice(props) {
  const { invoiceId } = useParams();
  //Saving the URL parameter invoiceId

  return <h1>You want to update the invoice with the ID:{invoiceId}!!!</h1>;
}
