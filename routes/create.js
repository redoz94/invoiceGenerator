//dependencies
const express = require("express");
const router = express.Router();
const invoiceModel = require("../models/invoice.js");

//Routes
router.post("/", (request, response) => {
  const input = request.body;

  const newDocument = new invoiceModel({
    sellerName: input.sellerName,
    sellerAddress: input.sellerAddress,
    customerName: input.customerName,
    customerAddress: input.customerAddress,
    finalPrice: input.finalPrice,
    terms: input.terms,
    items: input.items,
    invoiceDescription: input.invoiceDescription,
  });

  //Saving info inside DB
  newDocument.save((err, doc) => {
    if (err) {
      //if something goes wrong
      console.log("ERROR " + err);
      response
        .status(500)
        .json({ message: "Problems when saving the information" });
    } else {
      //everything works
      console.log("The information was saved");
      response.status(200).json({ message: "The information was saved" });
    }
  });
});

//exporting the contents
module.exports = router;
