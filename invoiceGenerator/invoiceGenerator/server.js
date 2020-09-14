// dependencies
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { response } = require("express");

//static web server
app.use(express.static(path.join(__dirname, "dist")));

//connection to mongodb
mongoose.connect(
  "mongodb+srv://root:helloworld@" +
    "invoicegeneratorapp1.3xtbm.gcp.mongodb.net/invoiceStorage?" +
    "retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("error", (error) => {
  console.log("ERROR" + error);
});

mongoose.connection.once("open", () => {
  console.log("The connection to mongodb atlas is working");
});

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//REST API
app.use("/api/createinvoice", require("./routes/create.js"));

app.use("/api/readinvoice", require("./routes/read.js"));

app.use("/api/updateinvoice", require("./routes/update.js"));

app.use("/api/deleteinvoice", require("./routes/delete.js"));

app.get("/hello", (request, response) => {
  response.sendFile(path.join(__dirname, "dist/invoice.html"));
});

app.get("*", (request, response) => {
  response.send("<h1>ERROR 404: PAGE NOT FOUND</h1>");
});

//port
app.listen(3000, () => {
  console.log("Listening at localhost: 3000");
});
