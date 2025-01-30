const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: String, required: true },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Registration', RegistrationSchema);
