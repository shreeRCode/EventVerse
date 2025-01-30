const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// POST request to create a new registration
router.post('/', async (req, res) => {
  try {
    const { name, email, event } = req.body;
    const registration = new Registration({ name, email, event });
    await registration.save();
    res.status(201).json(registration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET request to get all registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT request to update registration status
router.put('/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(registration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE request to delete a registration
router.delete('/:id', async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Registration deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
