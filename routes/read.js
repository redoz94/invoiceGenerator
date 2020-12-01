//dependencies
const express = require("express");
const router = express.Router();
const invoiceModel = require("../models/invoice.js");

//Routes
router.get("/all", (request, response) => {
  invoiceModel.find((err, docs) => {
    if (err) {
      console.log("ERROR " + err);
      response
        .status(500)
        .json({ message: "Problems when reading the information" });
    } else {
      console.log("All the invoices were found");
      response.status(200).json(docs);
    }
  });
});

router.get("/:invoiceId", (request, response) => {
  invoiceModel.findOne(
    {
      _id: request.params.invoiceId,
    },
    (err, invoice) => {
      if (err) {
        console.log("ERROR " + err);
        response
          .status(500)
          .json({ message: "Errors when reading the invoice" });
      } else {
        console.log("Invoice was found");
        response.status(200).json(invoice);
      }
    }
  );
});

//exporting the contents
module.exports = router;
