//Dependencies
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

  //Saving information into database
  newDocument.save((err, doc) => {
    if (err) {
      //something went wrong
      console.log("ERROR " + err);
      response.status(500).json({ message: "problems when saving the info." });
    } else {
      //everything is working
      console.log("the invoice was created successfully.");
      response
        .status(200)
        .json({ message: "the invoice was created successfully." });
    }
  });
});

//exporting the contents of this file

module.exports = router;
