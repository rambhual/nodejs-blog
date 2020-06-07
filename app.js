require("./db")();
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/users", require("./routes/user"));
app.use("/products", require("./routes/product"));
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server started on port");
});
