const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50 },
  phone: String
}));

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer)
    return res.send(customer);
  
  res.status(404).send('The customer with given customer id is not present');
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  
  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });

  res.send(await customer.save());
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) 
    return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  }, {
    new: true
  });

  if (customer)
    return res.send(customer);

  return res.status(404).send('The customer with given id is not present');
});

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().required().min(3).max(50),
    phone: Joi.string(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

module.exports = router;