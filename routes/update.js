const express = require("express");
const router = express.Router();
const invoiceModel = require("../models/invoice.js");
const invoice = require("../models/invoice.js");

//routes
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
      items: input.items,
      finalPrice: input.finalPrice,
      terms: input.terms,
      invoiceDescription: input.invoiceDescription,
    },
    (err, result) => {
      if (err) {
        //problems when updating the information
        console.log("error " + err);
        response.status(500).json({ message: "Problems when updating info" });
      } else {
        //if everything is working
        console.log("The invoice was updated");
        response
          .status(200)
          .json({ message: "The invoice was updated successfully" });
      }
    }
  );
});

//exporting the contents of this file
module.exports = router;
