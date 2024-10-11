const express = require('express');
const router = express.Router();

const regionController = require('../controllers/regionController')

// Get region by id 
router.get('/:id', (req, res) => {
    const id = req.params.id
    regionController.getRegion(id).then(user => {
      res.json(user);
    }).catch(err => {
        console.error('Error getting user', err);
        res.status(500).json({ error: 'Failed to get user' });
    });
  });

router.get('/', (req, res) => {
    console.log("Hello")
    regionController.getRegions().then(regions => {
        res.json(regions);
    }).catch(err => {
        console.error('Error getting regions', err);
        res.status(500).json({ error: 'Failed to get regions' });
    });
});


router.get('/:id/posts', (req, res) => {
    console.log("hello from posts")
    const id = req.params.id
    regionController.getPostsForRegion(id).then(posts => {
      res.json(posts);
    }).catch(err => {
      console.error('Error getting regions', err);
      res.status(500).json({ error: 'Failed to get regions' });
    });
  });

module.exports = router;