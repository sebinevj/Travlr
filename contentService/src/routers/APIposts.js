const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController')

// Get posts by id 
router.get('/:id', (req, res) => {
  const id = req.params.id
  postController.getPostById(id).then(user => {
    res.json(user);
  }).catch(err => {
    console.error('Error getting user', err);
    res.status(500).json({ error: 'Failed to get user' });
  });
});

//Get post comments
router.get('/:id/comments', (req, res) => {
  console.log("hello from posts")
  const id = req.params.id
  postController.getPostComments(id).then(posts => {
    res.json(posts);
  }).catch(err => {
    console.error('Error getting regions', err);
    res.status(500).json({ error: 'Failed to get regions' });
  });
});

// Add comment
router.post('/', (req, res) => {
  const { user_id, region_id, description} = req.body;
  postController.createPost(user_id, region_id, description)
  .then(newComment => {
      console.log(newComment)
    res.json({id: newComment});
  })
  .catch(err => {
    console.error('Error creating user: ', err);
    res.status(500).json({ error: 'Failed to create user' });
  });
});

module.exports = router;