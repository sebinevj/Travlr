const express = require('express');
const router = express.Router();

const followController = require('../controllers/followController')

// Get follows by id 
router.get('/:id', (req, res) => {
    const id = req.params.id
    followController.getFollows(id).then(user => {
      res.json(user);
    }).catch(err => {
        console.error('Error getting user', err);
        res.status(500).json({ error: 'Failed to get user' });
    });
  });

router.post('/:id', (req, res) => {
  const id = req.params.id
  followController.addFollow(id).then(user => {
    res.json(user);
  }).catch(err => {
      console.error('Error getting user', err);
      res.status(500).json({ error: 'Failed to get user' });
  });
});

module.exports = router;