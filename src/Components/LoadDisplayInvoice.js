import React from "react";
import { useParams } from "react-router-dom";
import DisplayInvoice from "./DisplayInvoice.js";

export default function LoadDisplayInvoice(props) {
  const { invoiceId } = useParams();
  //saving the url parameter into the invoiceId constant

  return <DisplayInvoice invoiceId={invoiceId} />;
}
