const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
  { id: 1, name: "action" },
  { id: 2, name: "drama" },
  { id: 3, name: "horror" },
  { id: 4, name: "comedy" },
  { id: 5, name: "romance" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

router.get("/:id", (req, res) => {
  const genre = lookUp(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with given id was not found");
  res.send(genre);
});

router.put("/:id", (req, res) => {
  // Look up genre and if it doesn't exists, return 404.
  const genre = lookUp(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with given id was not found");

  // Validate the genre, if invalid, return 400
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update the genre and return the updated genre
  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  // Look up and genre and return 404 if it doesn't exist
  const genre = lookUp(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with given id was not found");

  // Delete and return genre
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function lookUp(id) {
  return genres.find((c) => c.id === parseInt(id));
}

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
