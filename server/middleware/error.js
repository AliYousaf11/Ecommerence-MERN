const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internel Server Error";

  // cast error...
  if (error.name === "CastError") {
    const message = `Resource not found. Invalid ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  // product not fount....
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

// cast error...
// you can understand cast error like if you are enter id let suppose you enter
// id-> 1234 if the id not match into the mongodb id then they show id not found
// after that if you enter correct id but it length more then the default id length the
// it will show you castError correct id is -> 123 and you enter 123123123 then error occur
