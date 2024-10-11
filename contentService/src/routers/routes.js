const express = require('express');
const router = express.Router();

// Link API files.
const APIposts = require('./APIposts.js');
const APIcomments = require('./APIcomments');

// Route API files.
router.use('/posts', APIposts);
router.use('/comments', APIcomments);

// Export our router for our app to mount.
module.exports = router;