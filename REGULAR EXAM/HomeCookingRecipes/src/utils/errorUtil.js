const mongoose = require("mongoose");

exports.getErrorMessage = (err) => {
  if (err instanceof mongoose.MongooseError) {
    return Object.values(err.errors).map((e) => e.message);
  } else if (err instanceof Error) {
    return err.message;
  }
};
