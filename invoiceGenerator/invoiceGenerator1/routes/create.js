//dependencies
const express = require("express");
const router = express.Router();
const invoiceModel = require("../models/invoice.js");

//routes
router.post("/", (request, response) => {
  const input = request.body;

  const newDocument = new invoiceModel({
    sellerName: input.sellerName,
    sellerAddress: input.sellerAddress,
    customerName: input.customerName,
    customerAddress: input.customerAddress,
    items: input.items,
    finalPrice: input.finalPrice,
    terms: input.terms,
    invoiceDescription: input.invoiceDescription,
  });

  //saving the information into database
  newDocument.save((err, doc) => {
    if (err) {
      //if something goes wrong
      console.log("error " + err);
      response.status(500).json({ message: "Problems when saving info" });
    } else {
      //if everything succeeds
      console.log("the info was created successfully");
      response
        .status(200)
        .json({ message: "The invoice was created successfully" });
    }
  });
});

//exporting the contents of this file
module.exports = router;
