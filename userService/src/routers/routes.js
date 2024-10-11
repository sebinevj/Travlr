const express = require('express');
const router = express.Router();

// Link API files.
const APIusers = require('./APIusers');
const APIfollows = require('./APIfollows');
const APIregions = require('./APIregions');


// Route API files.
router.use('/users', APIusers);
router.use('/follows', APIfollows);
router.use('/regions', APIregions);

// Export our router for our app to mount.
module.exports = router;