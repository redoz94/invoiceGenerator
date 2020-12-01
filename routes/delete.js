//dependencies
const express = require("express");
const router = express.Router();
const invoiceModel = require("../models/invoice.js");

//Routes
router.delete("/:invoiceId", (request, response) => {
  invoiceModel.deleteOne(
    {
      _id: request.params.invoiceId,
    },
    (err) => {
      if (err) {
        //Something went wrong with deleting the invoice
        console.log("ERROR " + err);
        response
          .status(500)
          .json({ message: "Problems when deleting the invoice" });
      } else {
        //everything is working
        console.log("The invoice was deleted");
        response.status(200).json({ message: "The invoice was deleted." });
      }
    }
  );
});

//exporting the contents
module.exports = router;
