const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);

  // Logging levels:
  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed");
};
