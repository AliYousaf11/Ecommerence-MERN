const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

//middlewares.....
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//......
app.use("/api/v1", require("./routes/productsRoutes"));
app.use("/api/v1", require("./routes/userRoutes"));

app.use(errorMiddleware);

module.exports = app;
