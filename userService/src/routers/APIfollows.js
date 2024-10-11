const express = require('express');
const router = express.Router();

const followController = require('../controllers/followController')

// Get user by id 
router.get('/:id', (req, res) => {
    const id = req.params.id
    followController.getUser(id).then(user => {
      res.json(user);
    }).catch(err => {
        console.error('Error getting user', err);
        res.status(500).json({ error: 'Failed to get user' });
    });
  });

module.exports = router;