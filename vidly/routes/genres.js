const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true
  }
}));

// const genres = [
//   { id: 1, name: 'Poetry' },
//   { id: 2, name: 'Drama' },
//   { id: 3, name: 'Fiction' },
// ];

router.get('/', async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (genre)
      return res.send(genre);

    res.status(404).send('Given genre id is not found');
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  
  const newGenre = new Genre({
    name: req.body.name
  })

  const result = await newGenre.save();  
  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, {
    new: true
  });

  if (!genre) 
    return res.status(404).send('The genre with the given id is not found');
  
  res.send(genre);
  // try {
  //   const genre = await Genre.findById(req.params.id);

  //   const { error } = validateGenre(req.body);
  //   if (error)
  //     return res.status(400).send(error.details[0].message);

  //   genre.name = req.body.name;
  //   res.send(await genre.save());
  // } catch(err) {
  //   return res.status(404).send('Given genre id is not found ' + err.message);
  // }
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) 
    return res.status(404).send('The genre with the given id is not found');

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  }

  return Joi.validate(genre, schema);
}

module.exports = router;