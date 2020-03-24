const Joi = require('joi');
const mongoose = require('mongoose');

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

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().required().min(3).max(50),
    phone: Joi.string(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;