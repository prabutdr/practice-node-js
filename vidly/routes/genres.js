const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    // throw new Error("Somthing");
    const genres = await Genre.find();
    res.send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {

    const genre = await Genre.findById(req.params.id);

    if (genre)
      return res.send(genre);

    res.status(404).send('Given genre id is not found');
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  
  const newGenre = new Genre({
    name: req.body.name
  })

  const result = await newGenre.save();  
  res.send(result);
});

router.put('/:id', [validateObjectId, auth], async (req, res) => {
  const { error } = validate(req.body);
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

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) 
    return res.status(404).send('The genre with the given id is not found');

  res.send(genre);
});

module.exports = router;