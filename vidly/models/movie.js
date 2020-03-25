const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const { Genre } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  genre: {
    type: Genre.schema,
    required: true
  },
  numberInStock: {
    type: Number,
    default: 0
  },
  dailyRentalRate: {
    type: Number,
    default: 0
  }
}));

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  }

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;