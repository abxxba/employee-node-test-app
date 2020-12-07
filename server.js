const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");
var cors = require("cors");
const employeeRoutes = require("./routes/employee.routes");

const app = express();
//app.use(cors());
//BODY PARSER
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//MONGO
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//ROUTES;
app.use("/api/employees", employeeRoutes);
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

var PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server is listening on port 4000");
});
