const express = require("express");
const router = express.Router();
const invoiceModel = require("../models/invoice.js");

//routes
router.delete("/:invoiceId", (request, response) => {
  invoiceModel.deleteOne(
    {
      _id: request.params.invoiceId,
    },
    (err) => {
      if (err) {
        //problems when removing the invoice
        console.log("ERR " + err);
        response
          .status(500)
          .json({ message: "problems when removing the invoice" });
      } else {
        //everything is working
        console.log("The invoice was removed from Mongodb");
        response
          .status(200)
          .json({ message: "The invoice was removed from MongoDB" });
      }
    }
  );
});

//exporting the contents of this file
module.exports = router;
