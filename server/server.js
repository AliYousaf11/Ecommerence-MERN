const app = require("./app");
const dotenv = require("dotenv");
const mongoConnection = require("./config/db");
const colors = require("colors");

// uncatchError...... like(console.log(youtube))
process.on("uncatchError", (error) => {
  console.log(`Shutdown the server due to unCatchError ${error.message}`.bgRed);
  process.exit(1);
});

dotenv.config({
  path: "server/config/config.env",
});

mongoConnection();
const server = app.listen(process.env.PORT, () => {
  console.log(`server start http://localhost:${process.env.PORT}`.bgYellow);
});

// unhandle rejection...... (MongoDb Connection String)
process.on("unhandledRejection", (error) => {
  console.log(`Shutdown the server due to unHandlError ${error.message}`.bgRed);
  server.close(() => process.exit(1));
});
