//dependencies
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { response } = require("express");

//Static Web server
app.use(express.static(path.join(__dirname, "dist")));

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connection to mongodb atlas
mongoose.connect(
  "mongodb+srv://root:helloworld@" +
    "invoicegeneratorapp.sexzx.mongodb.net/invoiceStorage" +
    "?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("error", () => {
  console.log("ERROR " + err);
});

mongoose.connection.once("open", () => {
  console.log("The connection to mongodb atlas is working");
});
//REST API
app.use("/api/createinvoice", require("./routes/create.js"));

app.use("/api/readinvoice", require("./routes/read.js"));

app.use("/api/updateinvoice", require("./routes/update.js"));

app.use("/api/deleteinvoice", require("./routes/delete.js"));

app.get("/*", (request, response) => {
  response.sendFile(path.join(__dirname, "dist/invoice.html"));
});

//port
app.listen(3000, () => {
  console.log("Listening at Localhost: 3000");
});
