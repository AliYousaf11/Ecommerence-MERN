const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");

//middlewares.....
app.use(express.json());
app.use("/api/v1", require("./routes/productsRoutes"));
app.use("/api/v1", require("./routes/userRoutes"));

app.use(ErrorHandler);

module.exports = app;
