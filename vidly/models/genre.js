const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: true
  }
}));

// const genres = [
//   { id: 1, name: 'Poetry' },
//   { id: 2, name: 'Drama' },
//   { id: 3, name: 'Fiction' },
// ];

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).max(20).required()
  }

  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;