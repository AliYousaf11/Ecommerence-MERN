const mongoose = require("mongoose");
const colors = require("colors");

const mongoConnection = () => {
  try {
    const checkConnection = mongoose.connect(process.env.DB_URL);
    if (checkConnection) {
      console.log("mongodb connected".bgMagenta);
    } else {
      console.log("mongo db not connected ".bgGreen);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnection;
