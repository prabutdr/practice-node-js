const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (movie)
      return res.send(movie);

    res.status(404).send('Given movie id is not found');
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre)
    return res.send(400).send('Invalid genre.');
  
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body. dailyRentalRate
  })

  const result = await movie.save();  
  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: {
      name: req.body.genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body. dailyRentalRate
  }, {
    new: true
  });

  if (!movie) 
    return res.status(404).send('The movie with the given id is not found');
  
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) 
    return res.status(404).send('The movie with the given id is not found');

  res.send(movie);
});

module.exports = router;