import React from "react";
import { useParams } from "react-router-dom";
import UpdateInvoice from "./UpdateInvoice.js";

export default function LoadUpdateinvoice(props) {
  const { invoiceId } = useParams();
  //Saving the URL parameter invoiceId

  return <UpdateInvoice invoiceId={invoiceId} />;
}
