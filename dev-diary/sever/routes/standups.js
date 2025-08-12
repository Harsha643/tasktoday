const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Standup = require('../models/Standup');

// @route   POST api/standups
// @desc    Create a new standup
// @access  Private
router.post('/', auth, async (req, res) => {
  const { yesterday, today, blockers } = req.body;

  try {
    const newStandup = new Standup({
      user: req.user.id,
      yesterday,
      today,
      blockers,
    });

    const standup = await newStandup.save();
    res.json(standup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/standups
// @desc    Get all standups for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const standups = await Standup.find({ user: req.user.id }).sort({ date: -1 });
    res.json(standups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/standups/:id
// @desc    Get a standup by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const standup = await Standup.findById(req.params.id);
    
    if (!standup) {
      return res.status(404).json({ msg: 'Standup not found' });
    }
    
    // Check if user owns the standup
    if (standup.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(standup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/standups/:id
// @desc    Update a standup
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { yesterday, today, blockers } = req.body;
  
  // Build standup object
  const standupFields = {};
  if (yesterday) standupFields.yesterday = yesterday;
  if (today) standupFields.today = today;
  if (blockers !== undefined) standupFields.blockers = blockers;
  
  try {
    let standup = await Standup.findById(req.params.id);
    
    if (!standup) {
      return res.status(404).json({ msg: 'Standup not found' });
    }
    
    // Check if user owns the standup
    if (standup.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    standup = await Standup.findByIdAndUpdate(
      req.params.id,
      { $set: standupFields },
      { new: true }
    );
    
    res.json(standup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/standups/:id
// @desc    Delete a standup
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let standup = await Standup.findById(req.params.id);
    
    if (!standup) {
      return res.status(404).json({ msg: 'Standup not found' });
    }
    
    // Check if user owns the standup
    if (standup.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await Standup.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Standup removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;