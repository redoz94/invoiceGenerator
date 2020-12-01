import React from "react";
import { useParams } from "react-router-dom";
import DisplayInvoice from "./DisplayInvoice";

export default function LoadDisplayinvoice(props) {
  const { invoiceId } = useParams();
  //Saving the URL parameter into the invoiceId constant

  return <DisplayInvoice invoiceId={invoiceId} />;
}
