const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genres");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },
    numberInStock: {
      type: Number,
      default: 0,
    },
    dailyRentalRate: {
      type: Number,
      default: 0,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).required(),
    genreId: Joi.string().required(),
  };
  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
