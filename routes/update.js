//dependencies
const express = require("express");
const router = express.Router();
const invoiceModel = require("../models/invoice.js");

//Routes
router.put("/:invoiceId", (request, response) => {
  const input = request.body;

  invoiceModel.updateOne(
    {
      _id: request.params.invoiceId,
    },
    {
      sellerName: input.sellerName,
      sellerAddress: input.sellerAddress,
      customerName: input.customerName,
      customerAddress: input.customerAddress,
      finalPrice: input.finalPrice,
      terms: input.terms,
      items: input.items,
      invoiceDescription: input.invoiceDescription,
    },
    (err, result) => {
      if (err) {
        //If somethings wrong
        console.log("ERROR " + err);
        response
          .status(500)
          .json({ message: "Problems when  updating information" });
      } else {
        //everything works
        console.log("The invoice was updated");
        response
          .status(200)
          .json({ message: "The invoice was updated successfully." });
      }
    }
  );
});

//exporting the contents
module.exports = router;
