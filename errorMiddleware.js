const mongoose = require("mongoose");

function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  // If status code wasn't set, use 500
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Handle invalid ObjectId
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  res.status(statusCode).json({
    message: err.message || "Server error",
  });
}

module.exports = { notFound, errorHandler };
